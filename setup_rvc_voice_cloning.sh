#!/bin/bash
# RVC歌声克隆本地部署脚本

echo "================================================"
echo "🎤 RVC歌声克隆系统 - 本地部署"
echo "================================================"
echo ""

# 检查Python版本
echo "📋 检查Python环境..."
python3 --version

# 创建工作目录
WORK_DIR="$HOME/rvc_voice_cloning"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

echo "📁 工作目录: $WORK_DIR"
echo ""

# 安装依赖
echo "📦 安装系统依赖..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    brew install ffmpeg portaudio
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    sudo apt-get update
    sudo apt-get install -y ffmpeg portaudio19-dev python3-pyaudio
fi

echo ""
echo "📥 克隆RVC仓库..."
git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git
cd Retrieval-based-Voice-Conversion-WebUI

echo ""
echo "📦 安装Python依赖..."
pip install -r requirements.txt

echo ""
echo "================================================"
echo "✅ 安装完成!"
echo "================================================"
echo ""
echo "🚀 启动RVC WebUI:"
echo "   cd $WORK_DIR/Retrieval-based-Voice-Conversion-WebUI"
echo "   python infer-web.py"
echo ""
echo "🌐 然后访问: http://localhost:7897"
echo ""
echo "📖 使用流程:"
echo "   1. 访问Web界面"
echo "   2. 点击 '训练' 标签"
echo "   3. 上传参考音频（.wav/.mp3）"
echo "   4. 设置模型参数"
echo "   5. 点击训练按钮（需要5-10分钟）"
echo "   6. 训练完成后，切换到 '推理' 标签"
echo "   7. 选择训练好的模型"
echo "   8. 输入目标音频或文本"
echo "   9. 生成转换后的音频"
echo ""
echo "💡 提示:"
echo "   - 参考音频建议10-30秒"
echo "   - 音频质量越高，克隆效果越好"
echo "   - 建议使用GPU加速训练"
echo ""
