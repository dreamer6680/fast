import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const reqJson = await req.json();

  // 支持多种模型配置
  let model;
  
  // 配置1: OpenAI 兼容的 API (如 FastGPT, LocalAI, Ollama 等)
  if (process.env.CUSTOM_API_BASE_URL && process.env.CUSTOM_API_KEY) {
    const customProvider = createOpenAI({
      apiKey: process.env.CUSTOM_API_KEY,
      baseURL: process.env.CUSTOM_API_BASE_URL,
    });
    model = customProvider(process.env.CUSTOM_MODEL_NAME || 'gpt-3.5-turbo');
  }
  // 配置2: 标准 OpenAI
  else if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    model = openai(process.env.OPENAI_MODEL_NAME || 'gpt-3.5-turbo');
  }
  // 配置3: 使用 Inkeep 作为备用
  else {
    const inkeep = createOpenAI({
      apiKey: process.env.INKEEP_API_KEY,
      baseURL: 'https://api.inkeep.com/v1',
    });
    model = inkeep('inkeep-qa-sonnet-3-5');
  }

  // 系统提示词，可以根据需要自定义
  const systemPrompt = process.env.CUSTOM_SYSTEM_PROMPT || 
    `你是 FastGPT 的专业助手。请基于 FastGPT 文档内容回答用户问题，提供准确、有用的信息。
    如果用户问题超出 FastGPT 相关范围，请礼貌地引导用户回到 FastGPT 相关话题。`;

  const result = streamText({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      ...reqJson.messages.map((message: Record<string, unknown>) => ({
        role: message.role as 'user' | 'assistant',
        content: message.content as string,
      })),
    ],
    temperature: parseFloat(process.env.CUSTOM_TEMPERATURE || '0.7'),
    maxTokens: parseInt(process.env.CUSTOM_MAX_TOKENS || '2000'),
  });

  return result.toDataStreamResponse();
} 