import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Note content is required for summarization.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY

    // If API key is available, run actual OpenAI request
    if (apiKey && apiKey !== 'your-openai-api-key') {
      const openai = new OpenAI({ apiKey })

      const prompt = `
You are QuillInsight's AI agent. Analyze the following note content.
Return a JSON object containing:
1. "summary" (string): A brief, 1-2 sentence summary of the note.
2. "tags" (array of strings): Up to 3 relevant, concise tags for organization.
3. "takeaways" (array of strings): Exactly 3 key bullet points or takeaways/action items.

Note content:
"""
${content}
"""

Ensure the response is strictly valid JSON matching this schema:
{
  "summary": "...",
  "tags": ["tag1", "tag2", "tag3"],
  "takeaways": ["takeaway1", "takeaway2", "takeaway3"]
}
`

      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      })

      const responseText = chatCompletion.choices[0].message.content
      if (responseText) {
        const result = JSON.parse(responseText)
        return NextResponse.json(result)
      }
    }

    // Fallback Mock Response (when no OpenAI key is set, or request fails)
    // Create a mock summary based on input size or typical note contents
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Artificial delay for realism

    // Generates a mock summary that feels smart and responsive
    const wordCount = content.trim().split(/\s+/).length
    const titleLine = content.trim().split('\n')[0].replace(/[#*`]/g, '').trim()
    const summaryText = `This draft note (containing ${wordCount} words) focuses on "${titleLine || 'Untitled Topic'}". It details the user's primary objectives and outlines structural frameworks for execution.`

    return NextResponse.json({
      summary: summaryText,
      tags: ['demo', 'draft', 'quill-sandbox'],
      takeaways: [
        'Organize thoughts dynamically directly inside the browser editor.',
        'Unlock custom AI prompts and tags by registering a secure account.',
        'This is a demonstration summary (Configure OPENAI_API_KEY in .env.local to activate real AI insights).'
      ]
    })

  } catch (error: any) {
    console.error('AI Summarization Error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error occurred.' },
      { status: 500 }
    )
  }
}
