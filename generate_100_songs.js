#!/usr/bin/env node
/**
 * 批量生成100首不同主题的钢琴抒情曲 - 测试版（先生成3首）
 */

const API_URL = 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/generate';

// 测试歌曲：先生成3首验证功能
const songs = [
  {
    id: 1,
    title: "初次相遇",
    theme: "初遇",
    mood: "甜蜜、心跳",
    prompt: "A beautiful piano melody capturing the moment of first love encounter, sweet and tender",
    lyrics: `[verse]
人群之中看见你
时间仿佛停止呼吸
你的笑容如此清晰
让我忘掉了自己

[chorus]
第一次遇见你
世界变得美丽
这一刻的记忆
永远珍藏在心底`
  },
  {
    id: 2,
    title: "母爱",
    theme: "母爱",
    mood: "温暖、感恩",
    prompt: "Tender piano melody about mother's love",
    lyrics: `[verse]
妈妈的手温暖厚
抚平我所有伤口
她的爱像河流
永不枯竭不回头

[chorus]
妈妈我爱你
你的爱无与伦比
愿时光慢些走
让我好好陪伴你`
  },
  {
    id: 3,
    title: "追逐梦想",
    theme: "梦想",
    mood: "励志、向上",
    prompt: "Inspiring piano melody about chasing dreams",
    lyrics: `[verse]
心中有个梦想
像星星闪光芒
虽然路途漫长
但我不会彷徨

[chorus]
追逐梦想
勇敢飞翔
无论多远多高
都要去闯荡`
  }
];

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
  console.log(`🎵 生成进度: ${index}/${total} (${((index/total)*100).toFixed(1)}%)`);
  console.log(`${'='.repeat(80)}`);
  console.log(`📝 标题: ${song.title}`);
  console.log(`🎨 主题: ${song.theme}`);
  console.log(`💭 情绪: ${song.mood}`);
  console.log(`⏱️  开始时间: ${new Date().toLocaleString()}`);

  // 生成安全的文件名
  const safeFileName = song.title.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_');

  const payload = {
    prompt: `${song.prompt}, female vocals, gentle and emotional woman's singing voice`,
    lyrics: song.lyrics,
    audio_duration: 120, // 2分钟
    infer_step: 50,
    guidance_scale: 15.0,
    scheduler_type: 'euler',
    cfg_type: 'apg',
    omega_scale: 10.0,
    actual_seeds: [42 + index], // 每首歌使用不同的种子
    lora_name_or_path: 'none',
    lora_weight: 1.0,
    use_erg_tag: true,
    use_erg_lyric: true,
    use_erg_diffusion: true,
    output_path: `./output/${safeFileName}.wav`, // 自定义输出文件名
  };

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

    if (data.status === 'success' && data.output_path) {
      const audioUrl = data.output_path.replace('./output/', 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/');

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      const result = {
        id: song.id,
        title: song.title,
        theme: song.theme,
        mood: song.mood,
        prompt: song.prompt,
        lyrics: song.lyrics,
        audio_url: audioUrl,
        output_path: data.output_path,
        file_name: safeFileName,
        duration_seconds: duration,
        status: 'success',
        generated_at: new Date().toISOString()
      };

      results.push(result);
      successCount++;

      console.log(`✅ 生成成功! (耗时: ${duration}秒)`);
      console.log(`📁 文件名: ${safeFileName}.wav`);
      console.log(`🔗 下载链接: ${audioUrl}`);

      // 保存到文件
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

    // 保存失败记录
    saveProgress(failedResult, index);

    return null;
  }
}

/**
 * 保存进度到文件
 */
function saveProgress(result, index) {
  const fs = require('fs');
  const path = require('path');

  // 确保output目录存在
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 保存单首歌曲信息
  const songFile = path.join(outputDir, `song_${index}_${result.title.replace(/\s+/g, '_')}.json`);
  fs.writeFileSync(songFile, JSON.stringify(result, null, 2), 'utf-8');

  // 更新总进度文件
  const progressFile = path.join(outputDir, 'progress.json');
  const progress = {
    total: songs.length,
    completed: index,
    success: successCount,
    failed: failCount,
    last_update: new Date().toISOString()
  };
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf-8');
}

/**
 * 生成最终报告
 */
function generateFinalReport() {
  const fs = require('fs');
  const path = require('path');

  const report = {
    summary: {
      total: songs.length,
      success: successCount,
      failed: failCount,
      success_rate: ((successCount / songs.length) * 100).toFixed(2) + '%',
      completed_at: new Date().toISOString()
    },
    songs: results
  };

  // 保存完整报告
  const reportFile = path.join(__dirname, 'output/final_report.json');
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');

  // 生成可读的Markdown报告
  const markdown = generateMarkdownReport(report);
  const mdFile = path.join(__dirname, 'output/REPORT.md');
  fs.writeFileSync(mdFile, markdown, 'utf-8');

  // 生成播放列表
  const playlist = generatePlaylist(results.filter(r => r.status === 'success'));
  const playlistFile = path.join(__dirname, 'output/playlist.json');
  fs.writeFileSync(playlistFile, JSON.stringify(playlist, null, 2), 'utf-8');

  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 生成完成! 最终统计:`);
  console.log(`${'='.repeat(80)}`);
  console.log(`✅ 成功: ${successCount}/${songs.length}`);
  console.log(`❌ 失败: ${failCount}/${songs.length}`);
  console.log(`📈 成功率: ${((successCount / songs.length) * 100).toFixed(2)}%`);
  console.log(`\n📁 报告文件:`);
  console.log(`   - ${reportFile}`);
  console.log(`   - ${mdFile}`);
  console.log(`   - ${playlistFile}`);
  console.log(`${'='.repeat(80)}`);
}

/**
 * 生成Markdown报告
 */
function generateMarkdownReport(report) {
  let md = `# ${songs.length}首钢琴抒情曲生成报告\n\n`;
  md += `**生成时间**: ${new Date(report.summary.completed_at).toLocaleString()}\n\n`;
  md += `## 📊 统计摘要\n\n`;
  md += `- **总数**: ${report.summary.total}\n`;
  md += `- **成功**: ${report.summary.success}\n`;
  md += `- **失败**: ${report.summary.failed}\n`;
  md += `- **成功率**: ${report.summary.success_rate}\n\n`;
  md += `## 🎵 歌曲列表\n\n`;

  report.songs.forEach((song, index) => {
    if (song.status === 'success') {
      md += `### ${index + 1}. ${song.title}\n\n`;
      md += `- **主题**: ${song.theme}\n`;
      md += `- **情绪**: ${song.mood}\n`;
      md += `- **文件名**: ${song.file_name}.wav\n`;
      md += `- **下载**: [点击下载](${song.audio_url})\n`;
      md += `- **歌词**:\n\n`;
      md += `\`\`\`\n${song.lyrics}\n\`\`\`\n\n`;
    }
  });

  return md;
}

/**
 * 生成播放列表
 */
function generatePlaylist(successfulSongs) {
  return successfulSongs.map((song, index) => ({
    index: index + 1,
    title: song.title,
    theme: song.theme,
    mood: song.mood,
    file_name: song.file_name,
    url: song.audio_url,
    duration: 120
  }));
}

/**
 * 主流程
 */
async function main() {
  const fs = require('fs');
  const path = require('path');

  console.log('\n' + '='.repeat(80));
  console.log('🎹 钢琴抒情曲生成器 - 测试版（3首）');
  console.log('='.repeat(80));
  console.log(`📅 开始时间: ${new Date().toLocaleString()}`);
  console.log(`🎵 总计: ${songs.length}首歌曲`);
  console.log(`🎤 音色: 女声`);
  console.log(`⏱️  预计时间: ${(songs.length * 2 / 60).toFixed(1)} 分钟`);
  console.log('='.repeat(80));

  // 添加错误处理和重试逻辑
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    let retries = 3;

    while (retries > 0) {
      try {
        await generateSong(song, i + 1, songs.length);
        break; // 成功则跳出重试循环
      } catch (error) {
        retries--;
        if (retries > 0) {
          console.log(`⚠️  重试中... 剩余次数: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 5000)); // 等待5秒后重试
        } else {
          console.log(`❌ 重试次数用尽，跳过该歌曲`);
        }
      }
    }

    // 每生成完成
    if ((i + 1) % 1 === 0) {
      console.log(`\n💾 已完成 ${i + 1}/${songs.length}，进度已保存`);
    }

    // 避免API限流，间隔1秒
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 生成最终报告
  generateFinalReport();

  console.log(`\n🎉 全部完成! 结束时间: ${new Date().toLocaleString()}`);
  console.log(`\n💡 提示: 测试成功后，可以运行完整版生成100首歌曲`);
}

// 运行主流程
main().catch(error => {
  console.error('❌ 程序执行出错:', error);
  process.exit(1);
});
