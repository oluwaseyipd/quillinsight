import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import OpenAI from 'openai'

export async function GET() {
  const report: {
    status: 'healthy' | 'degraded' | 'unhealthy'
    timestamp: string
    supabase: { status: string; message: string; url?: string }
    openai: { status: string; message: string }
  } = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    supabase: { status: 'checking', message: '' },
    openai: { status: 'checking', message: '' },
  }

  // 1. Diagnose Supabase Configuration
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      report.supabase = {
        status: 'misconfigured',
        message: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.',
      }
      report.status = 'unhealthy'
    } else {
      const supabase = await createClient()
      
      // Attempt a lightweight select query on profiles table to verify RLS and DB connections
      const { error } = await supabase.from('profiles').select('id').limit(1)

      if (error) {
        report.supabase = {
          status: 'error',
          url: supabaseUrl,
          message: `Database connection verified, but profiles table query returned: ${error.message}`,
        }
        report.status = 'degraded'
      } else {
        report.supabase = {
          status: 'connected',
          url: supabaseUrl,
          message: 'Successfully connected to database and queried profiles table.',
        }
      }
    }
  } catch (err: any) {
    report.supabase = {
      status: 'failed',
      message: `Failed to initiate Supabase client: ${err?.message || err}`,
    }
    report.status = 'unhealthy'
  }

  // 2. Diagnose OpenRouter Configuration
  try {
    const openrouterKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL || 'openrouter/free'

    if (!openrouterKey || openrouterKey === 'your-openrouter-api-key') {
      report.openai = {
        status: 'misconfigured',
        message: 'Missing OPENROUTER_API_KEY. AI note summarization will fallback to mock data.',
      }
      if (report.status === 'healthy') report.status = 'degraded'
    } else {
      const openai = new OpenAI({
        apiKey: openrouterKey,
        baseURL: 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': 'https://quillinsight.vercel.app',
          'X-Title': 'QuillInsight',
        }
      })
      
      // Perform a low-token model test call to verify API key validity
      const testCompletion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: 'Say ok' }],
        max_tokens: 5,
      })

      const reply = testCompletion.choices[0].message.content?.trim()
      if (reply) {
        report.openai = {
          status: 'connected',
          message: `Successfully connected to OpenRouter API using model "${model}". Test reply: "${reply}"`,
        }
      } else {
        report.openai = {
          status: 'error',
          message: `Connection succeeded but OpenRouter returned an empty completion for model "${model}".`,
        }
        if (report.status === 'healthy') report.status = 'degraded'
      }
    }
  } catch (err: any) {
    report.openai = {
      status: 'failed',
      message: `Failed to query OpenRouter API: ${err?.message || err}`,
    }
    report.status = 'unhealthy'
  }

  return NextResponse.json(report)
}
