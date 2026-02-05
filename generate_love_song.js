// 生成浪漫爱情歌曲
const API_URL = 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/generate';

// 创作的歌词（浪漫爱情主题 - 欢快流行歌风格）
const lyrics = `[verse]
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
永远的所在`;

// 音乐描述
const prompt = 'An upbeat pop song with catchy melody, romantic and joyful, with energetic rhythm and bright synths';

async function generateMusic() {
  const payload = {
    prompt: prompt,
    lyrics: lyrics,
    audio_duration: 180, // 3分钟
    infer_step: 50,
    guidance_scale: 15.0,
    scheduler_type: 'euler',
    cfg_type: 'apg',
    omega_scale: 10.0,
    actual_seeds: [888],
    lora_name_or_path: 'none',
    lora_weight: 1.0,
    use_erg_tag: true,
    use_erg_lyric: true,
    use_erg_diffusion: true,
  };

  console.log('🎵 开始生成浪漫爱情歌曲...');
  console.log('📝 歌词主题：浪漫爱情');
  console.log('🎶 音乐风格：欢快流行歌');
  console.log('⏱️  预计时长：3分钟');
  console.log('');
  console.log('正在发送请求到API...');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log('');
    console.log('✅ 生成成功！');
    console.log('📁 输出路径:', data.output_path);

    if (data.output_path) {
      // 转换为完整URL
      const audioUrl = data.output_path.replace('./output/', 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/');
      console.log('🎵 下载链接:', audioUrl);
      console.log('');
      console.log('📄 歌词内容：');
      console.log('━'.repeat(60));
      console.log(lyrics);
      console.log('━'.repeat(60));
    }

    return data;
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    throw error;
  }
}

// 执行生成
generateMusic();
