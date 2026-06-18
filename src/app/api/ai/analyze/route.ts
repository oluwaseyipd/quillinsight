import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import OpenAI from 'openai'

export async function POST(request: Request) {
  let content = ''
  try {
    // 1. Authenticate user
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized access. Please log in.' },
        { status: 401 }
      )
    }

    // 2. Validate request content
    const body = await request.json()
    content = body.content || ''
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Note content is required for AI analysis.' },
        { status: 400 }
      )
    }

    // 3. Verify OpenAI key is configured
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey || apiKey === 'your-openai-api-key') {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 400 }
      )
    }

    // 4. Trigger OpenAI Chat completion using gpt-4o-mini
    const openai = new OpenAI({ apiKey })

    const prompt = `
You are QuillInsight's AI assistant. Analyze the note content provided below.
Provide a JSON response matching this schema:
{
  "summary": "Concise 1-2 sentence summary of the note.",
  "tags": ["tag1", "tag2", "tag3"], // up to 3 short, relevant organizational tags (lowercase, no spaces)
  "takeaways": ["takeaway1", "takeaway2", "takeaway3"] // exactly 3 actionable insights, tasks, or bullet highlights
}

Note content:
"""
${content}
"""

Ensure the response is strictly valid JSON matching the schema format.
`

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    })

    const responseText = chatCompletion.choices[0].message.content
    if (!responseText) {
      return NextResponse.json(
        { error: 'Empty response returned from OpenAI.' },
        { status: 500 }
      )
    }

    const result = JSON.parse(responseText)
    return NextResponse.json(result)

  } catch (error: any) {
    console.error('AI Analysis API Error:', error)

    const isQuotaError = error?.status === 429 || error?.code === 'insufficient_quota' || error?.message?.includes('quota')
    const isAuthError = error?.status === 401 || error?.code === 'invalid_api_key' || error?.message?.includes('API key')

    if (isQuotaError || isAuthError) {
      const wordCount = content.trim().split(/\s+/).length
      const titleLine = content.trim().split('\n')[0].replace(/[#*`]/g, '').trim()
      
      const errorContext = isQuotaError 
        ? "OpenAI Quota Exceeded (429). Check your billing details."
        : "OpenAI Auth Failed (401). Invalid API key in .env.local."

      const summaryText = `[Mock Mode - ${errorContext}] This note details "${titleLine || 'Untitled Topic'}" containing ${wordCount} words.`

      return NextResponse.json({
        summary: summaryText,
        tags: ['fallback', 'mock-ai', 'openai-limit'],
        takeaways: [
          'AI fallback dashboard summary activated due to OpenAI API restrictions.',
          'Click tag buttons below to verify automatic folder and note tag assignments.',
          'Run a query on /api/diagnostics to test the exact status of your API key configurations.'
        ]
      })
    }

    return NextResponse.json(
      { error: error?.message || 'An internal server error occurred.' },
      { status: 500 }
    )
  }
}
