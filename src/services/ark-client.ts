/**
 * AI API client — supports both Volcano Ark and third-party (墨行AI) endpoints.
 * Config via .env.local: ARK_BASE_URL + ARK_API_KEY
 */

const BASE = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3';

function getApiKey(): string {
  return process.env.ARK_API_KEY || '';
}

async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const apiKey = getApiKey();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      ...init.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }
  return res;
}

// ------ Chat (Doubao-Seed) ------
export async function chatCompletion(
  messages: { role: string; content: string }[],
  model = 'doubao-seed-2-1-pro-260628',
) {
  const res = await apiFetch('/chat/completions', {
    method: 'POST',
    body: JSON.stringify({ model, messages, max_tokens: 4096 }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ------ Image Generation (Seedream) ------
export interface ImageGenParams {
  prompt: string;
  size?: string;
  referenceImages?: string[];
  outputFormat?: 'png' | 'jpeg';
  watermark?: boolean;
}

export async function generateImage(params: ImageGenParams) {
  const body: Record<string, unknown> = {
    model: 'doubao-seedream-5-0-pro-260628',
    prompt: params.prompt,
    size: params.size || '2K',
    output_format: params.outputFormat || 'png',
    watermark: params.watermark ?? false,
    response_format: 'url',
  };
  if (params.referenceImages?.length) {
    body.image = params.referenceImages;
  }
  const res = await apiFetch('/images/generations', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return {
    url: data.data?.[0]?.url as string,
    size: data.data?.[0]?.size as string,
  };
}

// ------ Video Generation (Seedance) ------
export interface VideoGenParams {
  prompt: string;
  referenceImage?: string;
  duration?: number;
  aspectRatio?: string;
}

export async function createVideoTask(params: VideoGenParams) {
  const body: Record<string, unknown> = {
    model: 'doubao-seedance-2-0-mini-260615',
    prompt: params.prompt,
    duration: params.duration || 5,
    size: params.aspectRatio || '9:16',
  };
  if (params.referenceImage) {
    body.image_url = params.referenceImage;
  }
  const res = await apiFetch('/media/generations', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { taskId: data.id as string };
}

export async function queryVideoTask(taskId: string): Promise<{
  status: string;
  videoUrl?: string;
  error?: string;
}> {
  const res = await apiFetch(`/media/tasks/${taskId}`);
  const data = await res.json();
  return {
    status: data.status,
    videoUrl: data.output?.video_url || data.result?.video_url,
    error: data.error?.message,
  };
}

// ------ File Upload ------
export async function uploadFile(file: File): Promise<string> {
  const apiKey = getApiKey();
  const form = new FormData();
  form.append('file', file);
  form.append('purpose', 'vision');

  const res = await fetch(`${BASE}/files`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`File upload error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.id;
}

// ------ Video Understanding (via Chat API with video_url) ------
export async function analyzeVideo(
  fileId: string,
  instruction: string,
): Promise<string> {
  return chatCompletion([
    {
      role: 'user',
      content: JSON.stringify([
        { type: 'text', text: instruction },
        { type: 'video_url', video_url: { url: fileId } },
      ]),
    },
  ]);
}
