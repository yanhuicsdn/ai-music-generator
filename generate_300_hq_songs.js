#!/usr/bin/env node
/**
 * 生成300首高质量钢琴抒情曲
 * 高质量参数: infer_step=60, audio_duration=120
 * 女声演唱，自定义文件名
 */

const API_URL = 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/generate';
const fs = require('fs');
const path = require('path');

// 300首歌曲主题
function generate300Songs() {
  const songs = [];

  // 1-100: 情感与人生
  const emotions = [
    {title: "初见心动", theme: "一见钟情", prompt: "Love at first sight, piano melody"},
    {title: "甜蜜相恋", theme: "热恋", prompt: "Passionate love, romantic piano"},
    {title: "温柔守候", theme: "守护", prompt: "Gentle protection, caring melody"},
    {title: "深切思念", theme: "思念", prompt: "Deep longing, nostalgic piano"},
    {title: "幸福时刻", theme: "幸福", prompt: "Happy moments, joyful melody"},
    {title: "温暖拥抱", theme: "拥抱", prompt: "Warm embrace, comforting piano"},
    {title: "甜蜜约定", theme: "约定", prompt: "Sweet promise, hopeful melody"},
    {title: "永恒誓言", theme: "誓言", prompt: "Eternal vow, sacred piano"},
    {title: "真心相爱", theme: "真爱", prompt: "True love, pure melody"},
    {title: "深情告白", theme: "告白", prompt: "Love confession, emotional piano"},
    {title: "温柔微笑", theme: "微笑", prompt: "Gentle smile, warm melody"},
    {title: "心动瞬间", theme: "心动", prompt: "Heartbeat moment, exciting piano"},
    {title: "幸福时光", theme: "时光", prompt: "Happy times, nostalgic melody"},
    {title: "美好回忆", theme: "回忆", prompt: "Beautiful memories, reminiscent piano"},
    {title: "纯真年代", theme: "纯真", prompt: "Innocent era, pure melody"},
    {title: "青春岁月", theme: "青春", prompt: "Youth days, energetic piano"},
    {title: "梦想启航", theme: "梦想", prompt: "Dreams sailing, inspiring melody"},
    {title: "勇敢前行", theme: "勇气", prompt: "Brave forward, courageous piano"},
    {title: "坚持不懈", theme: "坚持", prompt: "Persistence, determined melody"},
    {title: "永不言弃", theme: "毅力", prompt: "Never give up, strong piano"},
    {title: "成长之路", theme: "成长", prompt: "Growth journey, reflective melody"},
    {title: "蜕变新生", theme: "蜕变", prompt: "Transformation, hopeful piano"},
    {title: "自我突破", theme: "突破", prompt: "Breakthrough, powerful melody"},
    {title: "超越极限", theme: "超越", prompt: "Transcend limits, epic piano"},
    {title: "自由飞翔", theme: "自由", prompt: "Fly freely, liberating melody"},
    {title: "心灵归宿", theme: "归宿", prompt: "Soul's home, peaceful piano"},
    {title: "内心宁静", theme: "宁静", prompt: "Inner peace, serene melody"},
    {title: "禅意人生", theme: "禅意", prompt: "Zen life, meditative piano"},
    {title: "淡然处世", theme: "淡然", prompt: "Calm living, tranquil melody"},
    {title: "智慧之光", theme: "智慧", prompt: "Wisdom light, enlightening piano"},
    {title: "生命礼赞", theme: "生命", prompt: "Life praise, celebratory melody"},
  ];

  // 101-200: 自然与风景
  const natures = [
    {title: "春暖花开", theme: "春天", prompt: "Spring blossoms, fresh piano"},
    {title: "夏日清风", theme: "夏天", prompt: "Summer breeze, light melody"},
    {title: "秋叶飘零", theme: "秋天", prompt: "Autumn leaves, melancholic piano"},
    {title: "冬日暖阳", theme: "冬天", prompt: "Winter sunshine, warm melody"},
    {title: "晨曦微光", theme: "清晨", prompt: "Morning light, hopeful piano"},
    {title: "夕阳西下", theme: "黄昏", prompt: "Sunset, peaceful melody"},
    {title: "星空璀璨", theme: "星空", prompt: "Starry sky, dreamy piano"},
    {title: "明月高悬", theme: "月亮", prompt: "Bright moon, serene melody"},
    {title: "流水潺潺", theme: "流水", prompt: "Flowing water, gentle piano"},
    {title: "山峦叠翠", theme: "山峦", prompt: "Green mountains, majestic piano"},
    {title: "海浪轻拍", theme: "海浪", prompt: "Ocean waves, calming piano"},
    {title: "森林低语", theme: "森林", prompt: "Forest whisper, nature melody"},
    {title: "鸟语花香", theme: "自然", prompt: "Birds and flowers, lively piano"},
    {title: "雨后彩虹", theme: "彩虹", prompt: "Rainbow, hopeful melody"},
    {title: "雪花纷飞", theme: "雪花", prompt: "Falling snow, ethereal piano"},
    {title: "云卷云舒", theme: "云彩", prompt: "Clouds drifting, peaceful piano"},
    {title: "花开花落", theme: "花开", prompt: "Flowers blooming, poetic piano"},
    {title: "四季轮回", theme: "四季", prompt: "Four seasons, cyclical melody"},
    {title: "大地的诗", theme: "大地", prompt: "Earth poem, grounded melody"},
    {title: "天空之歌", theme: "天空", prompt: "Sky song, uplifting melody"},
    {title: "海洋之心", theme: "海洋", prompt: "Heart of ocean, deep piano"},
    {title: "山林幽居", theme: "山林", prompt: "Mountain living, secluded melody"},
    {title: "田园风光", theme: "田园", prompt: "Pastoral scenery, folk melody"},
    {title: "城市灯火", theme: "城市", prompt: "City lights, modern piano"},
    {title: "乡村傍晚", theme: "乡村", prompt: "Countryside evening, rustic melody"},
    {title: "沙漠孤烟", theme: "沙漠", prompt: "Desert smoke, mysterious piano"},
    {title: "极光之美", theme: "极光", prompt: "Aurora beauty, magical piano"},
    {title: "瀑布飞流", theme: "瀑布", prompt: "Waterfall, powerful piano"},
    {title: "草原辽阔", theme: "草原", prompt: "Vast grassland, open melody"},
    {title: "湖光山色", theme: "湖泊", prompt: "Lake and mountain, scenic piano"},
  ];

  // 201-300: 故事与情感
  const stories = [
    {title: "童话王国", theme: "童话", prompt: "Fairy tale, whimsical piano"},
    {title: "勇士传说", theme: "传说", prompt: "Warrior legend, heroic piano"},
    {title: "浪漫邂逅", theme: "邂逅", prompt: "Romantic encounter, lovely melody"},
    {title: "离别车站", theme: "离别", prompt: "Farewell station, sentimental piano"},
    {title: "重逢喜悦", theme: "重逢", prompt: "Reunion joy, celebratory melody"},
    {title: "游子归乡", theme: "归乡", prompt: "Return home, nostalgic piano"},
    {title: "远方来信", theme: "书信", prompt: "Letter from afar, emotional piano"},
    {title: "老照片", theme: "回忆", prompt: "Old photo, reminiscent piano"},
    {title: "时光倒流", theme: "时光", prompt: "Time reversal, fantasy piano"},
    {title: "梦境之旅", theme: "梦境", prompt: "Dream journey, surreal piano"},
    {title: "童年记忆", theme: "童年", prompt: "Childhood memory, innocent piano"},
    {title: "成长烦恼", theme: "烦恼", prompt: "Growing pains, relatable melody"},
    {title: "青春热血", theme: "热血", prompt: "Youth passion, energetic piano"},
    {title: "友谊万岁", theme: "友谊", prompt: "Friendship forever, warm melody"},
    {title: "知己难求", theme: "知己", prompt: "Soulmate rare, precious melody"},
    {title: "亲人相伴", theme: "陪伴", prompt: "Family company, comforting piano"},
    {title: "父爱如山", theme: "父爱", prompt: "Father's love, strong melody"},
    {title: "母爱似水", theme: "母爱", prompt: "Mother's love, tender piano"},
    {title: "手足情深", theme: "手足", prompt: "Sibling love, harmonious piano"},
    {title: "家的温暖", theme: "家庭", prompt: "Home warmth, cozy piano"},
    {title: "新年祝福", theme: "新年", prompt: "New year blessing, festive piano"},
    {title: "生日快乐", theme: "生日", prompt: "Happy birthday, joyful melody"},
    {title: "节日欢歌", theme: "节日", prompt: "Festival song, celebratory piano"},
    {title: "月光情思", theme: "月光", prompt: "Moonlight thoughts, romantic piano"},
    {title: "星空寄语", theme: "星空", prompt: "Starry message, poetic piano"},
    {title: "海的思念", theme: "海洋", prompt: "Ocean longing, deep melody"},
    {title: "山间晨雾", theme: "山雾", prompt: "Mountain mist, mysterious piano"},
    {title: "古镇幽梦", theme: "古镇", prompt: "Ancient town dream, traditional piano"},
    {title: "巴黎夜色", theme: "巴黎", prompt: "Paris night, romantic piano"},
    {title: "东京街头", theme: "东京", prompt: "Tokyo streets, modern melody"},
    {title: "维也纳之舞", theme: "维也纳", prompt: "Vienna dance, classical piano"},
    {title: "威尼斯水乡", theme: "威尼斯", prompt: "Venice water, serene piano"},
    {title: "爱琴海", theme: "爱琴海", prompt: "Aegean sea, mediterranean piano"},
    {title: "阿尔卑斯山", theme: "雪山", prompt: "Alps mountains, majestic piano"},
    {title: "亚马逊雨林", theme: "雨林", prompt: "Amazon rainforest, exotic piano"},
    {title: "撒哈拉沙漠", theme: "沙漠", prompt: "Sahara desert, mysterious piano"},
    {title: "大堡礁", theme: "海洋", prompt: "Great Barrier Reef, oceanic piano"},
    {title: "极地冰川", theme: "冰川", prompt: "Polar glacier, icy piano"},
    {title: "火山喷发", theme: "火山", prompt: "Volcanic eruption, powerful piano"},
    {title: "峡谷回声", theme: "峡谷", prompt: "Canyon echo, resonant piano"},
    {title: "草原牧歌", theme: "草原", prompt: "Grassland pastoral, folk piano"},
    {title: "竹林听雨", theme: "竹林", prompt: "Bamboo rain, zen piano"},
    {title: "荷花池畔", theme: "荷花", prompt: "Lotus pond, elegant piano"},
    {title: "梅花三弄", theme: "梅花", prompt: "Plum blossom, classical piano"},
    {title: "菊花台", theme: "菊花", prompt: "Chrysanthemum, poetic piano"},
    {title: "茶园飘香", theme: "茶园", prompt: "Tea garden, asian melody"},
    {title: "麦田金黄", theme: "麦田", prompt: "Golden wheat, harvest piano"},
    {title: "葡萄庄园", theme: "葡萄", prompt: "Vineyard, romantic piano"},
    {title: "向日葵田", theme: "向日葵", prompt: "Sunflower field, bright piano"},
    {title: "薰衣草", theme: "薰衣草", prompt: "Lavender field, fragrant piano"},
    {title: "樱花雨", theme: "樱花", prompt: "Cherry blossom rain, japanese piano"},
    {title: "枫叶红了", theme: "枫叶", prompt: "Red maple, autumn piano"},
    {title: "银杏黄了", theme: "银杏", prompt: "Ginkgo yellow, nostalgic piano"},
    {title: "竹报平安", theme: "竹子", prompt: "Bamboo peace, asian piano"},
    {title: "松柏常青", theme: "松柏", prompt: "Pine and cypress, enduring melody"},
    {title: "流水潺潺", theme: "流水", prompt: "Flowing water, gentle piano"},
    {title: "高山流水", theme: "知音", prompt: "Mountain and water, classical piano"},
    {title: "阳春白雪", theme: "高雅", prompt: "High art, elegant piano"},
    {title: "平沙落雁", theme: "古曲", prompt: "Ancient melody, traditional piano"},
    {title: "十面埋伏", theme: "激昂", prompt: "Ambush from all sides, dramatic piano"},
    {title: "春江花月夜", theme: "春江", prompt: "Spring river, classical piano"},
    {title: "二泉映月", theme: "二泉", prompt: "Moon on second spring, sad piano"},
    {title: "梁祝", theme: "梁祝", prompt: "Butterfly lovers, romantic tragedy"},
    {title: "茉莉花", theme: "民歌", prompt: "Jasmine flower, folk piano"},
    {title: "彩云追月", theme: "追月", prompt: "Clouds chasing moon, playful piano"},
    {title: "雨打芭蕉", theme: "雨打", prompt: "Rain on banana, rhythmic piano"},
    {title: "渔舟唱晚", theme: "渔舟", prompt: "Fishing boat at dusk, peaceful piano"},
    {title: "汉宫秋月", theme: "汉宫", prompt: "Han palace autumn, royal piano"},
    {title: "阳关三叠", theme: "阳关", prompt: "Yangguan three folds, farewell melody"},
    {title: "梅花三弄", theme: "梅花", prompt: "Plum blossom thrice, classical piano"},
    {title: "醉渔唱晚", theme: "醉渔", prompt: "Drunken fisherman, lively piano"},
    {title: "广陵散", theme: "广陵", prompt: "Guangling scattering, ancient piano"},
    {title: "平湖秋月", theme: "平湖", prompt: "Lake autumn moon, serene piano"},
    {title: "寒鸦戏水", theme: "寒鸦", prompt: "Cold crow playing, playful piano"},
    {title: "蕉窗夜雨", theme: "夜雨", prompt: "Night rain on banana, melancholic piano"},
    {title: "流水", theme: "流水", prompt: "Flowing water, philosophical piano"},
    {title: "酒狂", theme: "酒狂", prompt: "Wine madness, free-spirited piano"},
    {title: "潇湘水云", theme: "潇湘", prompt: "Xiao River, picturesque piano"},
    {title: "捣衣", theme: "捣衣", prompt: "Washing clothes, folk melody"},
    {title: "关山月", theme: "关山", prompt: "Moon over mountain, frontier piano"},
    {title: "天山之春", theme: "天山", prompt: "Tianshan spring, exotic piano"},
    {title: "塞上曲", theme: "塞上", prompt: "Frontier melody, wild piano"},
    {title: "云庆", theme: "云庆", prompt: "Cloud celebration, festive piano"},
    {title: "屈原问渡", theme: "屈原", prompt: "Qu Yuan asking, historical piano"},
    {title: "忆古人", theme: "忆古", prompt: "Remembering ancients, nostalgic piano"},
    {title: "长门怨", theme: "长门", prompt: "Changmen resentment, sorrowful piano"},
    {title: "大胡茄", theme: "胡茄", prompt: "Great Hu Jia, ethnic piano"},
    {title: "小胡茄", theme: "小胡", prompt: "Small Hu Jia, ethnic melody"},
    {title: "胡茄十八拍", theme: "胡茄", prompt: "Hu Jia 18 beats, dramatic piano"},
    {title: "琴歌", theme: "琴歌", prompt: "Qin song, lyrical piano"},
    {title: "弦歌", theme: "弦歌", prompt: "String song, melodic piano"},
    {title: "吟揉", theme: "吟揉", prompt: "Chanting rubbing, vibrato piano"},
    {title: "滑音", theme: "滑音", prompt: "Glissando, sliding piano"},
    {title: "泛音", theme: "泛音", prompt: "Harmonics, ethereal piano"},
  ];

  // 合并所有歌曲
  return [
    ...emotions.map((s, i) => ({ ...s, id: i + 1, lyrics: generateLyrics(s.title, s.theme) })),
    ...natures.map((s, i) => ({ ...s, id: i + 101, lyrics: generateLyrics(s.title, s.theme) })),
    ...stories.map((s, i) => ({ ...s, id: i + 201, lyrics: generateLyrics(s.title, s.theme) }))
  ];
}

// 生成歌词
function generateLyrics(title, theme) {
  const templates = [
    `[verse]
${title}，${theme}
钢琴曲轻轻流淌
诉说着心中的美好

[chorus]
${title}
让心飞翔
在音乐的海洋
寻找方向`,

    `[verse]
月光洒在窗前
思绪飞向天边
${title}的夜晚
如此美丽

[chorus]
${theme}的记忆
永远珍藏在心底
这份美好
不会过期`,

    `[verse]
风轻轻吹过
带走所有忧愁
${title}的时刻
让人感动

[chorus]
${theme}如诗
${title}如画
在音乐的陪伴下
我们自由飞翔`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

// 生成300首歌曲列表
const songs = generate300Songs();

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
  console.log(`🎵 生成进度: ${index}/${total} (${((index/total)*100).toFixed(2)}%)`);
  console.log(`${'='.repeat(80)}`);
  console.log(`📝 标题: ${song.title}`);
  console.log(`🎨 主题: ${song.theme}`);
  console.log(`⏱️  开始时间: ${new Date().toLocaleString()}`);

  const safeFileName = `HQ_${song.title.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_')}`;

  const payload = {
    prompt: `${song.prompt}, female vocals, gentle and emotional woman's singing voice, high quality production`,
    lyrics: song.lyrics,
    audio_duration: 120, // 2分钟高质量
    infer_step: 60, // 高质量
    guidance_scale: 15.0,
    scheduler_type: 'euler',
    cfg_type: 'apg',
    omega_scale: 10.0,
    actual_seeds: [1000 + index], // 避免与之前的冲突
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

  const songFile = path.join(outputDir, `hq_song_${index}_${result.title.replace(/\s+/g, '_')}.json`);
  fs.writeFileSync(songFile, JSON.stringify(result, null, 2), 'utf-8');

  const progress = {
    total: songs.length,
    completed: index,
    success: successCount,
    failed: failCount,
    last_update: new Date().toISOString()
  };
  fs.writeFileSync(path.join(outputDir, 'progress_hq_300.json'), JSON.stringify(progress, null, 2), 'utf-8');
}

/**
 * 主流程
 */
async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('🎹 300首高质量钢琴抒情曲批量生成程序');
  console.log('='.repeat(80));
  console.log(`📅 开始时间: ${new Date().toLocaleString()}`);
  console.log(`🎵 总计: ${songs.length}首歌曲`);
  console.log(`🎤 音色: 女声`);
  console.log(`🎚️ 质量: 高质量 (infer_step=60, duration=120s)`);
  console.log(`⏱️  预计时间: ${(songs.length * 20 / 60).toFixed(1)} 分钟`);
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

    if ((i + 1) % 10 === 0) {
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
