#!/bin/bash
# 监控当前生成进度，完成后自动启动300首高质量歌曲生成

echo "================================================"
echo "🎹 监控脚本 - 等待95首完成后启动300首生成"
echo "================================================"
echo ""

# 等待当前生成完成
echo "⏳ 等待当前95首歌曲生成完成..."

while true; do
  # 检查进程是否还在运行
  if ! ps -p 12985 > /dev/null 2>&1; then
    echo ""
    echo "✅ 当前生成已完成！"
    break
  fi

  # 显示当前进度
  if [ -f "generation.log" ]; then
    CURRENT=$(tail -1 generation.log | grep "生成进度" | head -1)
    if [ ! -z "$CURRENT" ]; then
      echo -ne "\r当前进度: $CURRENT   "
    fi
  fi

  sleep 10
done

echo ""
echo "================================================"
echo "🎵 准备启动300首高质量歌曲生成..."
echo "================================================"
echo ""

# 等待5秒确保文件都写完
sleep 5

# 启动300首高质量歌曲生成
echo "🚀 启动300首高质量歌曲生成..."
nohup node generate_300_hq_songs.js > generation_300.log 2>&1 &
NEW_PID=$!

echo ""
echo "✅ 300首高质量歌曲生成已启动！"
echo "📁 进程ID: $NEW_PID"
echo "📝 日志文件: generation_300.log"
echo ""
echo "查看实时进度："
echo "  tail -f generation_300.log"
echo ""
echo "查看进度JSON："
echo "  cat output/progress_hq_300.json | jq"
echo ""
echo "⏱️  预计时间: 约100分钟（300首 × 20秒/首）"
echo ""
