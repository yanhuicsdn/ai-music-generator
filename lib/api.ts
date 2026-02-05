export interface MusicGenerationParams {
  prompt: string;
  lyrics?: string;
  audio_duration?: number;
  infer_step?: number;
  guidance_scale?: number;
  scheduler_type?: 'euler' | 'heun' | 'pingpong';
  cfg_type?: 'apg' | 'cfg' | 'cfg_star';
  omega_scale?: number;
  actual_seeds?: number[];
  guidance_interval?: number;
  min_guidance_scale?: number;
  use_erg_tag?: boolean;
  use_erg_lyric?: boolean;
  use_erg_diffusion?: boolean;
  guidance_scale_text?: number;
  guidance_scale_lyric?: number;
  lora_name_or_path?: string;
  lora_weight?: number;
}

export interface MusicGenerationResponse {
  status: string;
  output_path?: string;
  message?: string;
  detail?: string;
}

const API_BASE_URL = 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net';

export async function generateMusic(params: MusicGenerationParams): Promise<MusicGenerationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating music:', error);
    throw error;
  }
}

// 获取推荐音乐列表
export const recommendedMusic = [
  {
    id: 1,
    title: '钢琴抒情曲',
    description: 'A beautiful piano melody with emotional depth',
    url: 'https://gpu-pod695f21981228d81fa9e89bc7-8888.web.gpu.csdn.net/lab/tree/root/ACE-Step/output/M5000024DECO4GYfGo.mp3',
    prompt: 'A beautiful piano melody with emotional depth, smooth and flowing',
    duration: 60,
  },
  {
    id: 2,
    title: '欢快流行歌',
    description: 'An upbeat pop song with catchy melody',
    prompt: 'An upbeat pop song with catchy melody and energetic rhythm',
    duration: 120,
  },
  {
    id: 3,
    title: '中文说唱',
    description: 'A powerful Chinese rap beat with heavy bass',
    prompt: 'A powerful Chinese rap beat with heavy bass and strong drums',
    lora: 'ACE-Step/ACE-Step-v1-chinese-rap-LoRA',
    duration: 60,
  },
  {
    id: 4,
    title: '电子舞曲',
    description: 'Electronic dance music with synthesizers',
    prompt: 'Electronic dance music with synthesizers and pumping beat',
    duration: 90,
  },
  {
    id: 5,
    title: '古典交响',
    description: 'Orchestral symphony with strings and brass',
    prompt: 'Orchestral symphony with strings and brass, epic and dramatic',
    duration: 120,
  },
  {
    id: 6,
    title: '浪漫爱情（钢琴版）',
    description: '钢琴抒情风格的浪漫爱情歌曲',
    url: 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/output_bdd46f1ac7f044ce9c1bffe38de08d75.wav',
    prompt: 'A beautiful piano melody with emotional depth, romantic love song, smooth and flowing, gentle and touching',
    lyrics: `[verse]
遇见你那天阳光正好
你的微笑像春天的味道
心跳加速无处可逃
这种感觉多么奇妙

[verse]
牵着你的手漫步街道
所有烦恼都随风飘摇
你的眼眸闪耀着星光
照亮我每一个清早

[chorus]
爱在阳光下绽放
你是最美的篇章
牵着你的手飞翔
到地老到天荒

[chorus]
爱在阳光下绽放
写下幸福的乐章
有你在我的身旁
就是天堂的模样

[bridge]
无论春夏秋冬怎样变换
无论世界怎样千回百转
有你的爱就足够温暖
我们的故事永远写不完

[chorus]
爱在阳光下绽放
你是最美的篇章
牵着你的手飞翔
到地老到天荒

[outro]
这就是爱
我们的爱
永远的所在`,
    duration: 180,
  },
  {
    id: 7,
    title: '浪漫爱情（流行版）',
    description: '欢快流行风格的浪漫爱情歌曲',
    url: 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/output_7e0d0f65cd2e4517a4764a22d42dd74e.wav',
    prompt: 'An upbeat pop song with catchy melody, romantic and joyful, with energetic rhythm and bright synths',
    lyrics: `[verse]
遇见你那天阳光正好
你的微笑像春天的味道
心跳加速无处可逃
这种感觉多么奇妙

[verse]
牵着你的手漫步街道
所有烦恼都随风飘摇
你的眼眸闪耀着星光
照亮我每一个清早

[chorus]
爱在阳光下绽放
你是最美的篇章
牵着你的手飞翔
到地老到天荒

[chorus]
爱在阳光下绽放
写下幸福的乐章
有你在我的身旁
就是天堂的模样

[bridge]
无论春夏秋冬怎样变换
无论世界怎样千回百转
有你的爱就足够温暖
我们的故事永远写不完

[chorus]
爱在阳光下绽放
你是最美的篇章
牵着你的手飞翔
到地老到天荒

[outro]
这就是爱
我们的爱
永远的所在`,
    duration: 180,
  },
];
