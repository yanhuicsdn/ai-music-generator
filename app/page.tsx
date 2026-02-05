'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, Play, Pause, Sparkles, Download, Settings, Music2 } from 'lucide-react';
import { generateMusic, recommendedMusic } from '@/lib/api';

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<typeof recommendedMusic[0] | null>(null);
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audioDuration, setAudioDuration] = useState(60);
  const [inferStep, setInferStep] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(15.0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seed, setSeed] = useState(42);

  const handlePresetSelect = (preset: typeof recommendedMusic[0]) => {
    setSelectedPreset(preset);
    setPrompt(preset.prompt);
    setAudioDuration(preset.duration);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('请输入音乐描述');
      return;
    }

    setIsGenerating(true);
    setGeneratedAudioUrl(null);

    try {
      const params = {
        prompt,
        lyrics: lyrics || undefined,
        audio_duration: audioDuration,
        infer_step: inferStep,
        guidance_scale: guidanceScale,
        scheduler_type: 'euler' as const,
        cfg_type: 'apg' as const,
        omega_scale: 10.0,
        actual_seeds: [seed],
        lora_name_or_path: selectedPreset?.lora || 'none',
        lora_weight: 1.0,
      };

      const response = await generateMusic(params);

      if (response.status === 'success' && response.output_path) {
        // 转换相对路径为完整URL
        const audioUrl = response.output_path.replace('./output/', 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/');
        setGeneratedAudioUrl(audioUrl);
      } else {
        alert('生成失败: ' + (response.detail || response.message));
      }
    } catch (error: any) {
      alert('生成出错: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    const audio = document.getElementById('generatedAudio') as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playPreset = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music2 className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI音乐生成器
            </h1>
          </div>
          <p className="text-gray-300 text-lg mb-6">基于ACE-Step模型，使用AI创造独特的音乐</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/batch"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              批量生成30首歌曲
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Presets */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-400" />
                推荐音乐风格
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendedMusic.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedPreset?.id === preset.id
                        ? 'bg-purple-600 ring-2 ring-purple-400'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{preset.title}</span>
                      {preset.url && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPreset(preset.url);
                          }}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{preset.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                音乐描述
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">描述文本 *</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="例如: A beautiful piano melody with emotional depth"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">歌词（可选）</label>
                  <textarea
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    placeholder="[verse]Walking down the street&#10;Sun is shining bright&#10;[chorus]Feeling so alive"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-gray-400 mt-1">支持 [verse]、[chorus]、[bridge] 标签</p>
                </div>

                {/* Basic Parameters */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      时长 (秒): {audioDuration}
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={240}
                      value={audioDuration}
                      onChange={(e) => setAudioDuration(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      随机种子: {seed}
                    </label>
                    <input
                      type="number"
                      value={seed}
                      onChange={(e) => setSeed(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 outline-none"
                    />
                  </div>
                </div>

                {/* Advanced Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  {showAdvanced ? '隐藏' : '显示'}高级参数
                </button>

                {showAdvanced && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          推理步数: {inferStep}
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={inferStep}
                          onChange={(e) => setInferStep(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          引导强度: {guidanceScale}
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={30}
                          step={0.5}
                          value={guidanceScale}
                          onChange={(e) => setGuidanceScale(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    isGenerating
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/30'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      生成音乐
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            {/* Generated Audio */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-blue-400" />
                生成的音乐
              </h2>

              {generatedAudioUrl ? (
                <div className="space-y-4">
                  <audio
                    id="generatedAudio"
                    src={generatedAudioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={togglePlay}
                      className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5" />
                          暂停
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          播放
                        </>
                      )}
                    </button>
                    <a
                      href={generatedAudioUrl}
                      download
                      className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      下载
                    </a>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>时长: {audioDuration}秒</p>
                    <p>描述: {prompt}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">
                    {isGenerating ? '正在生成音乐，请稍候...' : '选择或输入描述后点击生成'}
                  </p>
                  {isGenerating && (
                    <div className="mt-4">
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                      <p className="text-sm text-gray-400 mt-2">这可能需要1-2分钟...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-semibold mb-3 text-blue-300">使用提示</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 使用英文描述能获得更好的效果</li>
                <li>• 歌词可以使用 [verse]、[chorus]、[bridge] 标签标记不同部分</li>
                <li>• 推理步数越高，质量越好但速度越慢</li>
                <li>• 引导强度控制生成音乐与描述的贴合程度</li>
                <li>• 不同的随机种子会产生不同的音乐</li>
                <li>• 点击推荐音乐旁边的播放按钮可以试听参考音乐</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-400 text-sm">
          <p>Powered by ACE-Step AI Music Generation Model</p>
        </footer>
      </div>
    </main>
  );
}
