'use client';

import { useState } from 'react';
import { Music, Play, Sparkles, Download, Settings, Pause, RotateCcw, List, Grid3X3 } from 'lucide-react';
import { generateMusic } from '@/lib/api';

// 100首歌曲主题模板
const songThemes = [
  // 1-10: 爱情主题
  { id: 1, title: "初次相遇", theme: "初遇", mood: "甜蜜、心跳", prompt: "A beautiful piano melody capturing the moment of first love encounter, sweet and tender", lyrics: `[verse]\n人群之中看见你\n时间仿佛停止呼吸\n你的笑容如此清晰\n让我忘掉了自己\n\n[chorus]\n第一次遇见你\n世界变得美丽\n这一刻的记忆\n永远珍藏在心底` },
  { id: 2, title: "思念的距离", theme: "异地恋", mood: "思念、期盼", prompt: "Emotional piano melody expressing longing in a long-distance relationship", lyrics: `[verse]\n隔着屏幕看你的脸\n距离让我们更挂牵\n每一天都在思念\n等待重逢的那一天\n\n[chorus]\n距离再远\n心相连\n思念如风\n吹过天边` },
  { id: 3, title: "求婚", theme: "求婚", mood: "浪漫、感动", prompt: "Romantic piano melody for a marriage proposal, deeply emotional", lyrics: `[verse]\n单膝跪地那一刻\n手捧玫瑰诉说\n你是我唯一的执着\n愿意陪我走过每个日落\n\n[chorus]\n嫁给我好吗\n让我们一起变老\n爱你的心永远不会老` },
  { id: 4, title: "婚礼进行曲", theme: "婚礼", mood: "神圣、喜悦", prompt: "Graceful piano wedding march, elegant and joyful", lyrics: `[verse]\n白色婚纱飘飘\n你向我走来笑\n今天的你最美好\n从此不再有烦恼\n\n[chorus]\n我愿意\n这一生守护你\n无论风雨\n我都陪着你` },
  { id: 5, title: "银发誓言", theme: "金婚", mood: "温馨、陪伴", prompt: "Warm piano melody celebrating 50 years of marriage", lyrics: `[verse]\n五十年光阴如梦\n银发见证情意浓\n牵手走过春夏秋冬\n爱在岁月中更加浓\n\n[chorus]\n白发苍苍\n依然爱你模样\n相伴一生\n是最美的风景` },
  { id: 6, title: "失恋的夜晚", theme: "失恋", mood: "伤感、治愈", prompt: "Melancholic piano melody for heartbreak, healing and comforting", lyrics: `[verse]\n眼泪滑落的夜晚\n回忆不停在盘旋\n你已走远\n留下我一人面对孤单\n\n[chorus]\n放手也是一种爱\n让彼此都自由\n伤口会慢慢愈合` },
  { id: 7, title: "暗恋", theme: "暗恋", mood: "羞涩、甜蜜", prompt: "Gentle piano melody expressing secret love, shy and sweet", lyrics: `[verse]\n远远看着你笑\n心跳乱了步调\n这份情不敢表\n只能藏在心底发酵\n\n[chorus]\n暗恋的味道\n酸酸又甜甜\n希望你知道\n又怕你知道` },
  { id: 8, title: "情人节", theme: "情人节", mood: "浪漫、甜蜜", prompt: "Romantic piano melody for Valentine's Day", lyrics: `[verse]\n玫瑰花开满街\n情人双双结对\n今天是特别的一夜\n让我对你说感谢\n\n[chorus]\n情人节快乐\n你是最美的礼物\n爱你不退缩` },
  { id: 9, title: "吵架后的和解", theme: "和好", mood: "温馨、包容", prompt: "Warm piano melody about reconciliation after argument", lyrics: `[verse]\n昨夜争吵太激烈\n今天沉默不说话\n其实心里都害怕\n失去对方才最大\n\n[chorus]\n对不起原谅我\n爱情需要包容\n让我们重新来过` },
  { id: 10, title: "校园恋爱", theme: "校园恋", mood: "青春、纯真", prompt: "Youthful piano melody about high school romance", lyrics: `[verse]\n操场边的那棵树\n见证我们最初的爱慕\n作业本上的涂鸦\n是青春最美的画\n\n[chorus]\n校园的恋情\n纯真又透明\n那时的我们\n最动心` },

  // 11-20: 友情主题
  { id: 11, title: "挚友情谊", theme: "友情", mood: "真诚、温暖", prompt: "Warm piano melody celebrating true friendship", lyrics: `[verse]\n十年风雨同舟\n你一直在身后\n分享喜悦分担愁\n这份情谊永长久\n\n[chorus]\n朋友一生一起走\n那些日子不再有\n一句话一辈子` },
  { id: 12, title: "闺蜜", theme: "闺蜜", mood: "亲密、分享", prompt: "Cheerful piano melody about best girlfriends", lyrics: `[verse]\n一起逛街一起美\n分享秘密不后悔\n你的眼泪我为你擦\n你的快乐我为你夸\n\n[chorus]\n闺蜜就是这样\n无论发生什么\n都在你身旁` },
  { id: 13, title: "兄弟", theme: "兄弟情", mood: "义气、信任", prompt: "Strong piano melody about brotherhood", lyrics: `[verse]\n一起打拼的日子\n经历多少风雨\n患难见真情\n兄弟一生行\n\n[chorus]\n兄弟情义比天高\n有难同当有福同享\n永远不散场` },
  { id: 14, title: "老友重逢", theme: "老友", mood: "怀旧、感动", prompt: "Nostalgic piano melody about reuniting with old friends", lyrics: `[verse]\n多年未见的老友\n相聚在那老路口\n回忆涌上心头\n还是那份温柔\n\n[chorus]\n老朋友好久不见\n容颜已变心未变\n举起杯畅谈从前` },
  { id: 15, title: "离别赠言", theme: "离别", mood: "不舍、祝福", prompt: "Emotional piano melody for saying goodbye to friends", lyrics: `[verse]\n明天你就要远行\n去追寻你的梦想\n虽然不舍得分离\n但依然为你鼓掌\n\n[chorus]\n朋友珍重\n愿你前程似锦\n无论多远\n心永远相连` },

  // 16-25: 亲情主题
  { id: 16, title: "母爱", theme: "母爱", mood: "温暖、感恩", prompt: "Tender piano melody about mother's love", lyrics: `[verse]\n妈妈的手温暖厚\n抚平我所有伤口\n她的爱像河流\n永不枯竭不回头\n\n[chorus]\n妈妈我爱你\n你的爱无与伦比\n愿时光慢些走\n让我好好陪伴你` },
  { id: 17, title: "父爱如山", theme: "父爱", mood: "深沉、敬重", prompt: "Strong piano melody about father's love", lyrics: `[verse]\n父亲的话语不多\n却为我撑起整个天空\n他的背影有些驼\n是为我付出太多\n\n[chorus]\n爸爸像山一样\n给我力量和方向\n感谢你的守望` },
  { id: 18, title: "家的温暖", theme: "家", mood: "温馨、归属", prompt: "Cozy piano melody about the warmth of home", lyrics: `[verse]\n无论走多远\n家永远在心间\n那盏灯为我点燃\n那份爱永远不变\n\n[chorus]\n家是避风的港湾\n家是温暖的源泉\n有家才有天` },
  { id: 19, title: "摇篮曲", theme: "摇篮曲", mood: "温柔、安宁", prompt: "Gentle lullaby piano melody", lyrics: `[verse]\n宝贝乖乖睡\n月亮笑微微\n星星来作陪\n梦里花正美\n\n[chorus]\n睡吧睡吧\n妈妈在身边\n守护你到天边` },
  { id: 20, title: "游子吟", theme: "思乡", mood: "乡愁、怀念", prompt: "Nostalgic piano melody about missing hometown", lyrics: `[verse]\n异乡的月光\n照在我的窗\n想起故乡的模样\n眼泪悄悄流淌\n\n[chorus]\n故乡故乡\n我在远方\n思念的种子\n在心里生长` },

  // 26-35: 梦想励志
  { id: 26, title: "追逐梦想", theme: "梦想", mood: "励志、向上", prompt: "Inspiring piano melody about chasing dreams", lyrics: `[verse]\n心中有个梦想\n像星星闪光芒\n虽然路途漫长\n但我不会彷徨\n\n[chorus]\n追逐梦想\n勇敢飞翔\n无论多远多高\n都要去闯荡` },
  { id: 27, title: "永不放弃", theme: "坚持", mood: "坚定、鼓励", prompt: "Determined piano melody about never giving up", lyrics: `[verse]\n跌倒了再爬起\n失败没关系\n只要不放弃\n胜利属于你\n\n[chorus]\n永不放弃\n坚持到底\n风雨过后\n必定见彩虹` },
  { id: 28, title: "成长", theme: "成长", mood: "感悟、收获", prompt: "Reflective piano melody about personal growth", lyrics: `[verse]\n一路跌跌撞撞\n慢慢学会了坚强\n经历风雨的成长\n让我更加坦荡\n\n[chorus]\n成长的路上\n有泪有笑\n每一步都值得\n骄傲地炫耀` },
  { id: 29, title: "毕业季", theme: "毕业", mood: "留恋、期待", prompt: "Emotional piano melody for graduation", lyrics: `[verse]\n蝉鸣声声在夏天\n我们笑着说再见\n毕业照定格笑脸\n回忆藏在心间\n\n[chorus]\n再见了校园\n我们会再相见\n带着梦想去远航` },
  { id: 30, title: "新开始", theme: "新起点", mood: "希望、勇气", prompt: "Hopeful piano melody about new beginnings", lyrics: `[verse]\n翻开新的一页\n书写新的章节\n过去的种种\n都是宝贵的经验\n\n[chorus]\n新的开始\n新的希望\n勇敢向前\n未来在发光` },
];

// 音乐风格预设
const musicStyles = [
  { id: 'piano', name: '钢琴抒情曲', description: '温柔感人的钢琴旋律', prompt: 'A beautiful piano melody with emotional depth, smooth and flowing' },
  { id: 'pop', name: '欢快流行歌', description: '轻快活泼的流行音乐', prompt: 'An upbeat pop song with catchy melody and energetic rhythm' },
  { id: 'rap', name: '中文说唱', description: '节奏感强的说唱音乐', prompt: 'A powerful Chinese rap beat with heavy bass and strong drums', lora: 'ACE-Step/ACE-Step-v1-chinese-rap-LoRA' },
  { id: 'electronic', name: '电子舞曲', description: '动感十足的电子音乐', prompt: 'Electronic dance music with synthesizers and pumping beat' },
  { id: 'classical', name: '古典交响', description: '壮丽宏伟的交响乐', prompt: 'Orchestral symphony with strings and brass, epic and dramatic' },
];

interface GeneratedSong {
  id: number;
  title: string;
  theme: string;
  status: 'pending' | 'generating' | 'success' | 'failed';
  progress?: number;
  audioUrl?: string;
  error?: string;
}

export default function BatchGeneratePage() {
  const [selectedStyle, setSelectedStyle] = useState(musicStyles[0]);
  const [audioDuration, setAudioDuration] = useState(120); // 2分钟
  const [inferStep, setInferStep] = useState(60); // 高质量
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [songs, setSongs] = useState<GeneratedSong[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // 启动批量生成
  const startBatchGeneration = async () => {
    setIsGenerating(true);
    setIsPaused(false);

    // 初始化歌曲列表
    const initialSongs: GeneratedSong[] = songThemes.map(theme => ({
      id: theme.id,
      title: theme.title,
      theme: theme.theme,
      status: 'pending',
    }));
    setSongs(initialSongs);

    // 逐个生成歌曲
    for (let i = 0; i < songThemes.length; i++) {
      if (isPaused) break;

      const theme = songThemes[i];
      const safeFileName = theme.title.replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_');

      // 更新当前歌曲状态为生成中
      setSongs(prev => prev.map(s =>
        s.id === theme.id ? { ...s, status: 'generating', progress: 0 } : s
      ));
      setCurrentProgress((i / songThemes.length) * 100);

      try {
        const params = {
          prompt: `${selectedStyle.prompt}, ${theme.prompt}, female vocals, gentle and emotional woman's singing voice`,
          lyrics: theme.lyrics,
          audio_duration: audioDuration,
          infer_step: inferStep,
          guidance_scale: 15.0,
          scheduler_type: 'euler' as const,
          cfg_type: 'apg' as const,
          omega_scale: 10.0,
          actual_seeds: [42 + theme.id],
          lora_name_or_path: selectedStyle.lora || 'none',
          lora_weight: 1.0,
          use_erg_tag: true,
          use_erg_lyric: true,
          use_erg_diffusion: true,
          output_path: `./output/${safeFileName}.wav`,
        };

        const response = await generateMusic(params);

        if (response.status === 'success' && response.output_path) {
          const audioUrl = response.output_path.replace('./output/', 'https://gpu-pod695f21981228d81fa9e89bc7-8000.web.gpu.csdn.net/output/');

          setSongs(prev => prev.map(s =>
            s.id === theme.id ? {
              ...s,
              status: 'success',
              progress: 100,
              audioUrl
            } : s
          ));
        } else {
          throw new Error(response.detail || response.message || 'Unknown error');
        }
      } catch (error: any) {
        setSongs(prev => prev.map(s =>
          s.id === theme.id ? {
            ...s,
            status: 'failed',
            error: error.message
          } : s
        ));
      }

      setCurrentProgress(((i + 1) / songThemes.length) * 100);

      // 避免API限流，间隔1秒
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsGenerating(false);
  };

  // 暂停/继续生成
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // 重置
  const reset = () => {
    setIsGenerating(false);
    setIsPaused(false);
    setSongs([]);
    setCurrentProgress(0);
  };

  // 下载所有成功生成的歌曲
  const downloadAll = () => {
    const successfulSongs = songs.filter(s => s.status === 'success' && s.audioUrl);
    successfulSongs.forEach(song => {
      const link = document.createElement('a');
      link.href = song.audioUrl!;
      link.download = `${song.title}.wav`;
      link.click();
    });
  };

  const successCount = songs.filter(s => s.status === 'success').length;
  const failedCount = songs.filter(s => s.status === 'failed').length;
  const generatingCount = songs.filter(s => s.status === 'generating').length;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music2 className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              批量音乐生成器
            </h1>
          </div>
          <p className="text-gray-300 text-lg">一次性生成30首不同主题的音乐，可自定义风格</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 风格选择 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-400" />
                选择音乐风格
              </h2>
              <div className="space-y-3">
                {musicStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedStyle.id === style.id
                        ? 'bg-purple-600 ring-2 ring-purple-400'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium mb-1">{style.name}</div>
                    <div className="text-sm text-gray-300">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 参数设置 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-pink-400" />
                参数设置
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    音频时长 (秒): {audioDuration}
                  </label>
                  <input
                    type="range"
                    min={60}
                    max={240}
                    step={30}
                    value={audioDuration}
                    onChange={(e) => setAudioDuration(Number(e.target.value))}
                    disabled={isGenerating}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    推理步数 (质量): {inferStep} - 高质量
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={10}
                    value={inferStep}
                    onChange={(e) => setInferStep(Number(e.target.value))}
                    disabled={isGenerating}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">步数越高，音质越好但速度越慢</p>
                </div>

                {showAdvanced && (
                  <div className="pt-4 border-t border-white/10 space-y-3 text-sm text-gray-300">
                    <div>引导强度: 15.0</div>
                    <div>音色: 女声</div>
                    <div>格式: WAV</div>
                    <div>采样率: 48kHz</div>
                  </div>
                )}

                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {showAdvanced ? '隐藏' : '显示'}详细参数
                </button>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="space-y-3">
              {!isGenerating ? (
                <button
                  onClick={startBatchGeneration}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/30"
                >
                  <Sparkles className="w-5 h-5" />
                  开始生成30首歌曲
                </button>
              ) : (
                <>
                  <button
                    onClick={togglePause}
                    className="w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500"
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-5 h-5" />
                        继续生成
                      </>
                    ) : (
                      <>
                        <Pause className="w-5 h-5" />
                        暂停生成
                      </>
                    )}
                  </button>
                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500"
                  >
                    <RotateCcw className="w-5 h-5" />
                    重置
                  </button>
                </>
              )}

              {successCount > 0 && (
                <button
                  onClick={downloadAll}
                  className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500"
                >
                  <Download className="w-5 h-5" />
                  下载全部 ({successCount}首)
                </button>
              )}
            </div>
          </div>

          {/* 右侧进度和歌曲列表 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 总体进度 */}
            {isGenerating && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  生成进度
                </h2>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>已完成: {successCount}/{songThemes.length}</span>
                    <span>{currentProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-green-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">{successCount}</div>
                    <div className="text-gray-300">成功</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-400">{generatingCount}</div>
                    <div className="text-gray-300">生成中</div>
                  </div>
                  <div className="bg-red-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-red-400">{failedCount}</div>
                    <div className="text-gray-300">失败</div>
                  </div>
                </div>
              </div>
            )}

            {/* 视图切换和筛选 */}
            <div className="flex items-center justify-between">
              <div className="text-gray-300">
                共 {songThemes.length} 首歌曲
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-600' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-600' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 歌曲列表 */}
            <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
              {songThemes.map((theme) => {
                const song = songs.find(s => s.id === theme.id);
                const status = song?.status || 'pending';

                return (
                  <div
                    key={theme.id}
                    className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transition-all ${
                      status === 'generating' ? 'ring-2 ring-blue-400' :
                      status === 'success' ? 'ring-2 ring-green-400' :
                      status === 'failed' ? 'ring-2 ring-red-400' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{theme.title}</h3>
                        <p className="text-sm text-gray-300">{theme.theme}</p>
                      </div>
                      <div className="ml-2">
                        {status === 'pending' && (
                          <div className="text-gray-400 text-xs">等待中</div>
                        )}
                        {status === 'generating' && (
                          <div className="text-blue-400 text-xs animate-pulse">生成中...</div>
                        )}
                        {status === 'success' && (
                          <div className="text-green-400 text-xs">✓ 完成</div>
                        )}
                        {status === 'failed' && (
                          <div className="text-red-400 text-xs">✗ 失败</div>
                        )}
                      </div>
                    </div>

                    {status === 'generating' && song?.progress && (
                      <div className="mb-3">
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full rounded-full transition-all"
                            style={{ width: `${song.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {status === 'success' && song?.audioUrl && (
                      <div className="space-y-2">
                        <audio controls className="w-full h-8">
                          <source src={song.audioUrl} type="audio/wav" />
                        </audio>
                        <a
                          href={song.audioUrl}
                          download={`${theme.title}.wav`}
                          className="block text-center text-sm bg-purple-600 hover:bg-purple-500 rounded-lg py-2 transition-colors"
                        >
                          <Download className="w-4 h-4 inline mr-1" />
                          下载
                        </a>
                      </div>
                    )}

                    {status === 'failed' && song?.error && (
                      <div className="text-xs text-red-400 mt-2">{song.error}</div>
                    )}
                  </div>
                );
              })}
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
