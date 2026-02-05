# AI音乐生成器

基于ACE-Step模型的AI音乐生成应用，使用Next.js构建。

## 功能特点

- 🎵 **文本生成音乐** - 输入描述文本即可生成音乐
- 🎤 **歌词支持** - 支持带歌词的音乐生成
- 🎨 **多种风格预设** - 内置5种推荐音乐风格
- ⚙️ **高级参数调节** - 支持推理步数、引导强度等参数调节
- 🎧 **在线试听** - 可试听参考音乐和生成的音乐
- 💾 **下载保存** - 支持下载生成的音乐文件

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **API**: ACE-Step音乐生成模型

## 快速开始

### 1. 安装依赖

```bash
cd /Users/yanhui/CascadeProjects/ai-music-generator
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

### 3. 访问应用

打开浏览器访问: [http://localhost:3000](http://localhost:3000)

## API配置

应用使用以下API端点:

- **生成音乐API**: `https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/generate`
- **参考音乐**: `https://gpu-pod695f21981228d81fa9e89bc7-8888.web.gpu.csdn.net/lab/tree/root/ACE-Step/output/M5000024DECO4GYfGo.mp3`

## 使用说明

### 基础用法

1. **选择预设风格** - 从左侧推荐音乐风格中选择一个，或者手动输入描述
2. **填写描述** - 在"音乐描述"文本框中输入想要生成的音乐描述（建议使用英文）
3. **添加歌词（可选）** - 如果需要生成带歌词的歌曲，在歌词框中输入
4. **调整参数** - 设置时长、随机种子等基本参数
5. **生成音乐** - 点击"生成音乐"按钮
6. **播放下载** - 生成完成后可以播放或下载音乐

### 高级参数

- **推理步数 (10-100)**: 控制生成质量，步数越高质量越好但速度越慢
- **引导强度 (1-30)**: 控制生成音乐与描述的贴合程度
- **随机种子**: 使用相同的种子会生成相同的音乐

### 歌词格式

支持使用标签标记不同部分:
```
[verse]主歌部分歌词
[chorus]副歌部分歌词
[bridge]桥段部分歌词
```

## 项目结构

```
ai-music-generator/
├── app/
│   ├── layout.tsx       # 应用布局
│   ├── page.tsx         # 主页面
│   └── globals.css      # 全局样式
├── lib/
│   └── api.ts           # API调用逻辑
├── public/              # 静态资源
├── next.config.mjs      # Next.js配置
├── tailwind.config.ts   # Tailwind配置
└── package.json         # 项目依赖
```

## API参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| prompt | string | 必填 | 音乐描述文本 |
| lyrics | string | "" | 歌词内容 |
| audio_duration | float | 60.0 | 音频时长（秒，最大240） |
| infer_step | int | 50 | 推理步数（10-100） |
| guidance_scale | float | 15.0 | 引导强度（1.0-30.0） |
| scheduler_type | string | "euler" | 调度器类型 |
| cfg_type | string | "apg" | CFG类型 |
| actual_seeds | array | [] | 随机种子数组 |
| lora_name_or_path | string | "none" | LoRA权重路径 |

## 构建生产版本

```bash
npm run build
npm start
```

## 注意事项

- 生成音乐可能需要1-2分钟时间
- 建议使用英文描述以获得更好的效果
- 生成的音频格式为WAV
- 音频时长最长支持240秒（4分钟）

## 许可证

MIT
