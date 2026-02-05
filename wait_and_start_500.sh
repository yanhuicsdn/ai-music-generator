#!/bin/bash
# 监控300首生成进度，完成后自动启动500首超高质量歌曲生成

echo "================================================"
echo "🎹 监控脚本 - 等待300首完成后启动500首超高质量生成"
echo "================================================"
echo ""

# 等待300首生成完成
echo "⏳ 等待300首高质量歌曲生成完成..."

while true; do
  # 检查300首生成的进程是否还在运行
  if [ -f "output/progress_hq_300.json" ]; then
    PROGRESS=$(cat output/progress_hq_300.json | jq -r '.completed // 0')
    TOTAL=$(cat output/progress_hq_300.json | jq -r '.total // 300')

    if [ "$PROGRESS" -eq "$TOTAL" ]; then
      echo ""
      echo "✅ 300首高质量歌曲已完成！"
      break
    fi

    echo -ne "\r当前进度: $PROGRESS/$TOTAL ($((PROGRESS * 100 / TOTAL))%)   "
  fi

  sleep 10
done

echo ""
echo "================================================"
echo "🎵 准备启动500首超高质量歌曲生成..."
echo "================================================"
echo ""

# 等待5秒确保文件都写完
sleep 5

# 启动500首超高质量歌曲生成
echo "🚀 启动500首超高质量歌曲生成..."
nohup node generate_500_ultra_hq.js > generation_500.log 2>&1 &
NEW_PID=$!

echo ""
echo "✅ 500首超高质量歌曲生成已启动！"
echo "📁 进程ID: $NEW_PID"
echo "📝 日志文件: generation_500.log"
echo ""
echo "查看实时进度："
echo "  tail -f generation_500.log"
echo ""
echo "查看进度JSON："
echo "  cat output/progress_ultra_500.json | jq"
echo ""
echo "⏱️  预计时间: 约208分钟（500首 × 25秒/首 ≈ 3.5小时）"
echo ""
