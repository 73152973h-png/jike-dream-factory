'use client';

export default function DownloadPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <video autoPlay loop muted playsInline preload="auto" disableRemotePlayback className="absolute inset-0 w-full h-full object-cover opacity-20" style={{willChange:'transform',transform:'translateZ(0)',backfaceVisibility:'hidden'}}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">下载客户端</h1>
        <p className="text-zinc-400 mb-12 max-w-lg">
          即氪梦工厂支持 Windows、macOS 桌面客户端，获得更流畅的使用体验
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Windows */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
            <div className="text-4xl mb-4">🪟</div>
            <h3 className="text-lg font-bold text-white mb-2">Windows</h3>
            <p className="text-xs text-zinc-500 mb-6">Windows 10/11 · x64</p>
            <a
              href="https://github.com/73152973h-png/jike-dream-factory/releases/download/v1.0.0/即氪梦工厂-Setup-v1.0.0.zip"
              target="_blank"
              className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              下载 Windows 版
            </a>
            <p className="text-[10px] text-zinc-600 mt-3">v1.0.0 · 约 150MB</p>
          </div>

          {/* macOS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
            <div className="text-4xl mb-4">🍎</div>
            <h3 className="text-lg font-bold text-white mb-2">macOS</h3>
            <p className="text-xs text-zinc-500 mb-6">macOS 13+ · Apple Silicon</p>
            <a
              href="https://github.com/73152973h-png/jike-dream-factory/releases/download/v1.0.0/即氪梦工厂-Setup-v1.0.0.zip"
              target="_blank"
              className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              下载 macOS 版
            </a>
            <p className="text-[10px] text-zinc-600 mt-3">v1.0.0 · 约 160MB</p>
          </div>
        </div>

        <p className="text-xs text-zinc-600 mt-12">
          也可直接使用 <a href="/" className="text-blue-400 hover:underline">网页版</a>，无需下载 · <a href="https://github.com/73152973h-png/jike-dream-factory/releases" target="_blank" className="text-blue-400 hover:underline">GitHub Releases</a>
        </p>
      </div>
    </div>
  );
}
