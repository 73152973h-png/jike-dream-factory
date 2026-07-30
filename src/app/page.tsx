'use client';

const MODELS = [
  'Seedance 2.0', 'Seedream 5.0', 'Kling 2.0', 'Qwen 3', 'Kimi K2',
  'DeepSeek V3', 'GPT-4o', 'Claude 4', 'Gemini 2.5', '文心一言 4.5',
  '通义千问', '智谱 GLM-4', '百川 4', 'Doubao-Seed 2.1',
  'Hunyuan', 'MiniMax', 'Step-2', 'Spark 4.0',
];

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background — hardware accelerated */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          filter: 'blur(0px)',
        }}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Brand */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
          金涛即氪梦工厂
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
          企业级大模型管理平台
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mb-2 leading-relaxed">
          一站式聚合 Seedance、Seedream、Kling、Qwen、Kimi 等国产文本、图像、视频模型
        </p>
        <p className="text-sm text-zinc-500 max-w-xl mb-10">
          提供企业级高并发支持，助力快速接入全球领先 AI 能力
        </p>

        {/* CTA */}
        <div className="flex gap-4 mb-16">
          <a
            href="/project/new"
            className="px-6 py-3 rounded-xl font-medium text-black transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #3b82f6)' }}
          >
            立即体验 →
          </a>
          <a
            href="/download"
            className="px-6 py-3 rounded-xl font-medium text-white border border-white/20 hover:border-white/40 transition-all hover:scale-105"
          >
            下载客户端
          </a>
        </div>

        {/* Scrolling model bar */}
        <div className="w-full max-w-4xl overflow-hidden">
          <p className="text-xs text-zinc-500 mb-3">已接入模型</p>
          <div className="relative overflow-hidden">
            <div className="flex gap-3 animate-scroll">
              {[...MODELS, ...MODELS].map((m, i) => (
                <span
                  key={i}
                  className="shrink-0 px-4 py-1.5 rounded-full border border-white/10 text-sm text-zinc-400 whitespace-nowrap hover:border-white/30 hover:text-white transition-colors cursor-default"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll animation — injected via style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; width: max-content; }
      `}} />
    </div>
  );
}
