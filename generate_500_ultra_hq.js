#!/usr/bin/env node
/**
 * 生成500首超高质量钢琴抒情曲
 * 超高质量参数: infer_step=60, audio_duration=150
 * 女声演唱，自定义文件名
 */

const API_URL = 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/generate';
const fs = require('fs');
const path = require('path');

// 500首歌曲主题生成器
function generate500Songs() {
  const songs = [];

  // 1-100: 爱情系列 - 深度情感
  for (let i = 1; i <= 100; i++) {
    const loveThemes = [
      {title: `爱的初章${i}`, theme: "初恋", prompt: "First love tender piano"},
      {title: `热恋时节${i}`, theme: "热恋", prompt: "Passionate love romantic piano"},
      {title: `思念如潮${i}`, theme: "思念", prompt: "Deep longing nostalgic piano"},
      {title: `甜蜜回忆${i}`, theme: "回忆", prompt: "Sweet memories reminiscent piano"},
      {title: `永恒承诺${i}`, theme: "承诺", prompt: "Eternal promise sacred piano"},
    ];
    const theme = loveThemes[i % 5];
    songs.push({
      ...theme,
      id: i,
      lyrics: generateLoveLyrics(i)
    });
  }

  // 101-200: 人生哲学 - 深度思考
  for (let i = 101; i <= 200; i++) {
    const philosophyThemes = [
      {title: `生命意义${i-100}`, theme: "生命", prompt: "Meaning of life philosophical piano"},
      {title: `时间流逝${i-100}`, theme: "时间", prompt: "Time passing contemplative piano"},
      {title: `存在思考${i-100}`, theme: "存在", prompt: "Existential thought deep piano"},
      {title: `宇宙浩瀚${i-100}`, theme: "宇宙", prompt: "Vast universe cosmic piano"},
      {title: `灵魂探索${i-100}`, theme: "灵魂", prompt: "Soul exploration spiritual piano"},
    ];
    const theme = philosophyThemes[(i-101) % 5];
    songs.push({
      ...theme,
      id: i,
      lyrics: generatePhilosophyLyrics(i-100)
    });
  }

  // 201-300: 世界音乐 - 全球文化
  const worldMusic = [
    {id: 201, title: "中国风", theme: "中国", prompt: "Chinese style traditional piano", lyrics: generateWorldLyrics("中国", "古筝悠扬")},
    {id: 202, title: "日本韵", theme: "日本", prompt: "Japanese style zen piano", lyrics: generateWorldLyrics("日本", "樱花飘落")},
    {id: 203, title: "韩国风", theme: "韩国", prompt: "Korean style emotional piano", lyrics: generateWorldLyrics("韩国", "阿里郎")},
    {id: 204, title: "印度情", theme: "印度", prompt: "Indian style sitar piano", lyrics: generateWorldLyrics("印度", "瑜伽冥想")},
    {id: 205, title: "阿拉伯", theme: "阿拉伯", prompt: "Arabian style desert piano", lyrics: generateWorldLyrics("阿拉伯", "沙漠之夜")},
    {id: 206, title: "非洲鼓", theme: "非洲", prompt: "African rhythm tribal piano", lyrics: generateWorldLyrics("非洲", "草原之歌")},
    {id: 207, title: "欧洲古", theme: "欧洲", prompt: "European classical piano", lyrics: generateWorldLyrics("欧洲", "古典城堡")},
    {id: 208, title: "美洲印", theme: "美洲原住", prompt: "Native American nature piano", lyrics: generateWorldLyrics("美洲", "大峡谷")},
    {id: 209, title: "巴西热", theme: "巴西", prompt: "Brazilian carnival samba piano", lyrics: generateWorldLyrics("巴西", "桑巴舞曲")},
    {id: 210, title: "阿根廷", theme: "阿根廷", prompt: "Argentine tango passionate piano", lyrics: generateWorldLyrics("阿根廷", "探戈")},
    // ... 继续添加更多
  ];
  songs.push(...worldMusic);

  // 填充到300首
  for (let i = 211; i <= 300; i++) {
    songs.push({
      id: i,
      title: `世界风情${i-210}`,
      theme: "世界",
      prompt: "World music exotic piano",
      lyrics: generateWorldLyrics("世界", `第${i-210}首`)
    });
  }

  // 301-400: 情绪疗愈 - 心理健康
  for (let i = 301; i <= 400; i++) {
    const healingThemes = [
      {title: `治愈心灵${i-300}`, theme: "疗愈", prompt: "Healing meditation piano"},
      {title: `放松减压${i-300}`, theme: "放松", prompt: "Relaxation stress relief piano"},
      {title: `安神助眠${i-300}`, theme: "睡眠", prompt: "Sleep aid lullaby piano"},
      {title: `焦虑缓解${i-300}`, theme: "抗焦虑", prompt: "Anxiety relief calming piano"},
      {title: `抑郁疗愈${i-300}`, theme: "抗抑郁", prompt: "Depression healing uplifting piano"},
    ];
    const theme = healingThemes[(i-301) % 5];
    songs.push({
      ...theme,
      id: i,
      lyrics: generateHealingLyrics(i-300)
    });
  }

  // 401-500: 创意实验 - 前卫音乐
  for (let i = 401; i <= 500; i++) {
    const creativeThemes = [
      {title: `梦境奇境${i-400}`, theme: "梦境", prompt: "Dreamscape surreal piano"},
      {title: `未来科技${i-400}`, theme: "未来", prompt: "Future technology sci-fi piano"},
      {title: `太空漫游${i-400}`, theme: "太空", prompt: "Space exploration cosmic piano"},
      {title: `深海探秘${i-400}`, theme: "深海", prompt: "Deep sea mysterious piano"},
      {title: `魔法世界${i-400}`, theme: "魔法", prompt: "Magical world fantasy piano"},
    ];
    const theme = creativeThemes[(i-401) % 5];
    songs.push({
      ...theme,
      id: i,
      lyrics: generateCreativeLyrics(i-400)
    });
  }

  return songs;
}

// 歌词生成器
function generateLoveLyrics(num) {
  return `[verse]
爱在心中绽放
如花儿般芬芳
第${num}次心动
是我对你的向往

[chorus]
爱情的故事
永远写不完
你的微笑
是我最美的期盼`;
}

function generatePhilosophyLyrics(num) {
  return `[verse]
人生如梦
第${num}个思考
在时光中穿梭
寻找生命的意义

[chorus]
存在的价值
不在于长短
而在于
我们如何活过`;
}

function generateWorldLyrics(country, element) {
  return `[verse]
${country}的风情
${element}的美丽
在音乐中流淌
诉说着千年的故事

[chorus]
跨越国界
心灵相通
在${country}
感受生命的律动`;
}

function generateHealingLyrics(num) {
  return `[verse]
第${num}次疗愈
让心灵回归平静
所有的伤痛
都会随风而去

[chorus]
治愈的力量
来自内心深处
爱自己
是最美的开始`;
}

function generateCreativeLyrics(num) {
  return `[verse]
第${num}个梦境
奇幻而美妙
超越现实的边界
探索未知的领域

[chorus]
创意无限
想象飞翔
在音乐的宇宙
自由地徜徉`;
}

// 生成500首歌曲
const songs = generate500Songs();

// 结果记录
const results = [];
let successCount = 0;
let failCount = 0;

/**
 * 生成单首歌曲
 */
async function generateSong(song, index, total) {
  const startTime = Date.now();

  console.log(`\n${'='.repeat(80)}`);
  console.log(`🎵 超高质量生成进度: ${index}/${total} (${((index/total)*100).toFixed(2)}%)`);
  console.log(`${'='.repeat(80)}`);
  console.log(`📝 标题: ${song.title}`);
  console.log(`🎨 主题: ${song.theme}`);
  console.log(`⏱️  开始时间: ${new Date().toLocaleString()}`);

  const safeFileName = `ULTRA_HQ_${song.title.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_')}`;

  const payload = {
    prompt: `${song.prompt}, female vocals, gentle and emotional woman's singing voice, ultra high quality production, studio recording`,
    lyrics: song.lyrics,
    audio_duration: 150, // 2.5分钟超高质量
    infer_step: 60, // 高质量
    guidance_scale: 15.0,
    scheduler_type: 'euler',
    cfg_type: 'apg',
    omega_scale: 10.0,
    actual_seeds: [2000 + index],
    lora_name_or_path: 'none',
    lora_weight: 1.0,
    use_erg_tag: true,
    use_erg_lyric: true,
    use_erg_diffusion: true,
    output_path: `./output/${safeFileName}.wav`,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success' && data.output_path) {
      const audioUrl = data.output_path.replace('./output/', 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/');
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      const result = {
        id: song.id,
        title: song.title,
        theme: song.theme,
        audio_url: audioUrl,
        file_name: safeFileName,
        duration_seconds: duration,
        status: 'success',
        generated_at: new Date().toISOString()
      };

      results.push(result);
      successCount++;

      console.log(`✅ 生成成功! (耗时: ${duration}秒)`);
      console.log(`📁 文件名: ${safeFileName}.wav`);
      console.log(`🔗 下载: ${audioUrl}`);

      saveProgress(result, index);
      return result;
    } else {
      throw new Error(data.detail || data.message || 'Unknown error');
    }
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    failCount++;

    const failedResult = {
      id: song.id,
      title: song.title,
      theme: song.theme,
      error: error.message,
      duration_seconds: duration,
      status: 'failed',
      failed_at: new Date().toISOString()
    };

    results.push(failedResult);
    console.log(`❌ 生成失败: ${error.message} (耗时: ${duration}秒)`);
    saveProgress(failedResult, index);
    return null;
  }
}

/**
 * 保存进度
 */
function saveProgress(result, index) {
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const songFile = path.join(outputDir, `ultra_song_${index}_${result.title.replace(/\s+/g, '_')}.json`);
  fs.writeFileSync(songFile, JSON.stringify(result, null, 2), 'utf-8');

  const progress = {
    total: songs.length,
    completed: index,
    success: successCount,
    failed: failCount,
    last_update: new Date().toISOString()
  };
  fs.writeFileSync(path.join(outputDir, 'progress_ultra_500.json'), JSON.stringify(progress, null, 2), 'utf-8');
}

/**
 * 主流程
 */
async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('🎹 500首超高质量钢琴抒情曲批量生成程序');
  console.log('='.repeat(80));
  console.log(`📅 开始时间: ${new Date().toLocaleString()}`);
  console.log(`🎵 总计: ${songs.length}首歌曲`);
  console.log(`🎤 音色: 女声`);
  console.log(`🎚️ 质量: 超高质量 (infer_step=60, duration=150s)`);
  console.log(`⏱️  预计时间: ${(songs.length * 25 / 60).toFixed(1)} 分钟 (约${(songs.length * 25 / 60 / 60).toFixed(1)}小时)`);
  console.log('='.repeat(80));

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    let retries = 3;

    while (retries > 0) {
      try {
        await generateSong(song, i + 1, songs.length);
        break;
      } catch (error) {
        retries--;
        if (retries > 0) {
          console.log(`⚠️  重试中... 剩余次数: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    }

    if ((i + 1) % 20 === 0) {
      console.log(`\n💾 已完成 ${i + 1}/${songs.length}，进度已保存`);
    }

    // 避免API限流，间隔2秒
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 最终统计:`);
  console.log(`${'='.repeat(80)}`);
  console.log(`✅ 成功: ${successCount}/${songs.length}`);
  console.log(`❌ 失败: ${failCount}/${songs.length}`);
  console.log(`📈 成功率: ${((successCount / songs.length) * 100).toFixed(2)}%`);
  console.log(`\n🎉 全部完成! 结束时间: ${new Date().toLocaleString()}`);
}

main().catch(error => {
  console.error('❌ 程序执行出错:', error);
  process.exit(1);
});
