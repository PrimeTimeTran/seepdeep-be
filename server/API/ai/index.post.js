import { OpenAI } from 'openai'
import { Readable } from 'stream'

const runtimeConfig = useRuntimeConfig()
const { openAIKey = 'openAIKey' } = runtimeConfig
const openai = new OpenAI({ apiKey: openAIKey })

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const text = body.body
    const response = await openai.audio.speech.create({
      input: text,
      voice: 'alloy',
      model: 'tts-1',
      stream: true,
    })
    const audioData = await response.arrayBuffer()
    const responseHeaders = {
      'Content-Type': 'audio/mpeg',
    }
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: responseHeaders,
      body: Buffer.from(audioData).toString('base64'),
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    }
  }
})
