#!/usr/bin/env python3
"""
歌声克隆示例 - 使用Fish Audio API
从参考音乐提取音色，用新歌词生成歌声
"""

import requests
import json
import os
from pathlib import Path

# ============ 配置区 ============
# 你需要在 https://fish.audio/ 注册并获取API Key
FISH_AUDIO_API_KEY = "your_fish_audio_api_key_here"  # 替换为你的API Key

# 参考音乐URL
REFERENCE_AUDIO_URL = "https://gpu-pod695f21981228d81fa9e89bc7-8888.web.gpu.csdn.net/lab/tree/root/ACE-Step/output/M5000024DECO4GYfGo.mp3"

# 新歌词
LYRICS = """[verse]
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
到地老到天荒"""

# API配置
FISH_API_BASE = "https://api.fish.audio/v1"

# ============ 核心功能 ============

def download_reference_audio(url: str, output_path: str = "reference_audio.mp3") -> str:
    """下载参考音频"""
    print(f"📥 下载参考音频...")

    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()

        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"✅ 参考音频已保存: {output_path}")
        return output_path
    except Exception as e:
        print(f"❌ 下载失败: {e}")
        raise

def create_voice_model(api_key: str, audio_path: str, voice_name: str = "Cloned Voice") -> str:
    """
    创建音色模型

    Args:
        api_key: Fish Audio API Key
        audio_path: 参考音频文件路径
        voice_name: 音色名称

    Returns:
        voice_id: 创建的音色模型ID
    """
    print(f"🎙️  创建音色模型...")

    url = f"{FISH_API_BASE}/voice"
    headers = {
        "Authorization": f"Bearer {api_key}",
    }

    files = {
        "file": open(audio_path, "rb"),
    }

    data = {
        "name": voice_name,
        "description": "Cloned from reference music"
    }

    try:
        response = requests.post(url, headers=headers, files=files, data=data, timeout=60)
        response.raise_for_status()

        result = response.json()
        voice_id = result.get("id") or result.get("voice_id")

        print(f"✅ 音色模型创建成功!")
        print(f"📝 Voice ID: {voice_id}")
        return voice_id

    except Exception as e:
        print(f"❌ 创建音色模型失败: {e}")
        if hasattr(e, 'response'):
            print(f"响应内容: {e.response.text}")
        raise

def generate_singing(
    api_key: str,
    voice_id: str,
    lyrics: str,
    output_path: str = "cloned_singing.mp3",
    speed: float = 1.0
) -> str:
    """
    使用克隆的音色生成歌声

    Args:
        api_key: Fish Audio API Key
        voice_id: 音色模型ID
        lyrics: 歌词文本
        output_path: 输出文件路径
        speed: 语速 (0.5-2.0)

    Returns:
        output_path: 生成的音频文件路径
    """
    print(f"🎵 生成歌声...")
    print(f"📝 歌词长度: {len(lyrics)} 字符")

    url = f"{FISH_API_BASE}/tts"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "text": lyrics,
        "voice": voice_id,
        "output_format": "mp3",
        "speed": speed,
        # 歌声合成参数
        "sameness_threshold": 0.5,  # 相似度阈值
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        response.raise_for_status()

        # 保存音频
        with open(output_path, 'wb') as f:
            f.write(response.content)

        print(f"✅ 歌声生成成功!")
        print(f"📁 文件路径: {output_path}")
        print(f"📊 文件大小: {os.path.getsize(output_path) / 1024:.2f} KB")

        return output_path

    except Exception as e:
        print(f"❌ 生成歌声失败: {e}")
        if hasattr(e, 'response'):
            print(f"响应内容: {e.response.text}")
        raise

def list_available_voices(api_key: str) -> list:
    """列出所有可用的音色模型"""
    print(f"📋 获取可用音色列表...")

    url = f"{FISH_API_BASE}/voice"
    headers = {
        "Authorization": f"Bearer {api_key}",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        voices = response.json().get("items", [])
        print(f"✅ 找到 {len(voices)} 个音色模型:")

        for i, voice in enumerate(voices, 1):
            print(f"  {i}. {voice.get('name')} (ID: {voice.get('id')})")

        return voices

    except Exception as e:
        print(f"❌ 获取音色列表失败: {e}")
        return []

# ============ 主流程 ============

def main():
    """主流程"""
    print("=" * 60)
    print("🎤 歌声克隆系统 - Fish Audio API")
    print("=" * 60)
    print()

    # 检查API Key
    if FISH_AUDIO_API_KEY == "your_fish_audio_api_key_here":
        print("❌ 请先设置 Fish Audio API Key!")
        print("📍 获取地址: https://fish.audio/")
        print("📝 修改脚本中的 FISH_AUDIO_API_KEY 变量")
        return

    try:
        # 步骤1: 下载参考音频
        print("\n📍 步骤 1/3: 下载参考音频")
        print("-" * 60)
        audio_path = download_reference_audio(REFERENCE_AUDIO_URL)

        # 步骤2: 创建音色模型
        print("\n📍 步骤 2/3: 创建音色模型")
        print("-" * 60)
        voice_id = create_voice_model(FISH_AUDIO_API_KEY, audio_path, "My Cloned Voice")

        # 步骤3: 生成歌声
        print("\n📍 步骤 3/3: 生成新歌声")
        print("-" * 60)
        output_path = generate_singing(FISH_AUDIO_API_KEY, voice_id, LYRICS)

        # 完成
        print("\n" + "=" * 60)
        print("🎉 歌声克隆完成!")
        print("=" * 60)
        print(f"📁 输出文件: {output_path}")
        print(f"🎙️  音色ID: {voice_id}")
        print()
        print("💡 提示: 下次可以直接使用 voice_id 生成更多歌曲")
        print()

    except Exception as e:
        print(f"\n❌ 执行失败: {e}")
        import traceback
        traceback.print_exc()

# ============ 便捷函数 ============

def quick_generate_with_existing_voice(voice_id: str, new_lyrics: str, output_path: str = "new_singing.mp3"):
    """
    使用已存在的音色模型快速生成新歌声

    Args:
        voice_id: 已创建的音色模型ID
        new_lyrics: 新歌词
        output_path: 输出路径
    """
    if FISH_AUDIO_API_KEY == "your_fish_audio_api_key_here":
        print("❌ 请先设置 Fish Audio API Key!")
        return

    print(f"🎵 使用已有音色生成歌声...")
    return generate_singing(FISH_AUDIO_API_KEY, voice_id, new_lyrics, output_path)

if __name__ == "__main__":
    # 首次运行 - 创建音色模型并生成
    main()

    # 后续运行 - 使用已创建的音色快速生成
    # quick_generate_with_existing_voice("your_voice_id_here", "新歌词内容", "output2.mp3")
