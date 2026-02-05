# 歌声克隆实现方案

## 方案对比

### 1. RVC (Retrieval-based Voice Conversion) ⭐推荐
- **优点**: 效果好，速度快，社区活跃
- **原理**: 基于检索的语音转换
- **难度**: 中等
- **在线服务**: https://www.voicemod.net/ , https://aivc.upi.cn/

### 2. So-VITS-SVC
- **优点**: 歌声转换效果好
- **原理**: 歌声转换模型
- **难度**: 较高，需要训练

### 3. Fish Audio API 🐟推荐
- **优点**: 在线API，支持中英文，效果好
- **原理**: TTS + 歌声合成
- **难度**: 简单
- **官网**: https://fish.audio/

### 4. GPT-SoVITS
- **优点**: 结合GPT，效果自然
- **原理**: GPT + 语音合成
- **难度**: 较高

## 推荐方案：使用Fish Audio API

### 为什么选择Fish Audio？
1. ✅ 支持歌声合成
2. ✅ 支持中英文
3. ✅ 有免费额度
4. ✅ API简单易用
5. ✅ 可以从音频样本克隆音色

### 实现步骤

#### 步骤1: 注册Fish Audio
访问 https://fish.audio/ 注册账号

#### 步骤2: 创建声音模型
上传参考音频，训练音色模型

#### 步骤3: 调用API生成歌声
```
POST https://api.fish.audio/v1/tts
```

## 快速开始示例

```python
import requests

API_KEY = "your_fish_audio_api_key"
BASE_URL = "https://api.fish.audio/v1"

# 1. 上传音频样本，创建音色
def create_voice_model(audio_path):
    url = f"{BASE_URL}/voice"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
    }
    files = {
        "file": open(audio_path, "rb"),
        "name": "My Singing Voice"
    }
    response = requests.post(url, headers=headers, files=files)
    return response.json()["id"]

# 2. 使用音色生成歌声
def generate_singing(voice_id, lyrics, output_path):
    url = f"{BASE_URL}/tts"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "text": lyrics,
        "voice": voice_id,
        "output_format": "mp3"
    }
    response = requests.post(url, headers=headers, json=data)

    with open(output_path, "wb") as f:
        f.write(response.content)

# 使用示例
voice_id = create_voice_model("reference_audio.mp3")
generate_singing(voice_id, "我的歌词内容", "output.mp3")
```

## 其他在线服务

### 1. ElevenLabs
- 网址: https://elevenlabs.io/
- 支持: 语音克隆、TTS
- 免费额度: 每月10,000字符

### 2. Resemble AI
- 网址: https://www.resemble.ai/
- 支持: 语音克隆
- 免费试用: 30分钟

### 3. Play.ht
- 网址: https://play.ht/
- 支持: 语音克隆、TTS
- 免费额度: 有限

## 本地部署方案

### RVC本地部署

#### 环境要求
```bash
# Python 3.8+
# CUDA 11.3+ (GPU加速)
```

#### 安装步骤
```bash
# 克隆RVC仓库
git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git
cd Retrieval-based-Voice-Conversion-WebUI

# 安装依赖
pip install -r requirements.txt

# 启动WebUI
python infer-web.py
```

#### 使用流程
1. 访问 http://localhost:7897
2. 上传参考音频
3. 训练模型（需要5-10分钟）
4. 输入目标音频/文本
5. 生成转换后的音频

## 注意事项

⚠️ **重要提醒**:
1. 只能克隆公开的、非版权保护的音频
2. 不要使用未经授权的艺人声音
3. 遵守当地法律法规
4. 商业使用需获得授权

## 完整示例代码

见: `singing_clone_demo.py`
