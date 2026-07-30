'use client';

export default function AssetsPage() {
  const demos = [
    { name: '霸道总裁爱上我', date: '2026-07-30', status: '已完成', lang: 'English', eps: 80 },
    { name: '重生之商业帝国', date: '2026-07-29', status: '分镜中', lang: '日本語', eps: 60 },
    { name: '穿越古代当王妃', date: '2026-07-28', status: '已完成', lang: '한국어', eps: 100 },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">素材库</h1>
            <p className="text-sm text-zinc-400 mt-1">保存已完成和进行中的短剧项目</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg text-sm border border-white/10 text-zinc-400 hover:text-white hover:border-white/20">
              导入项目
            </button>
            <button className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500">
              + 新建项目
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demos.map((d, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors group cursor-pointer">
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-white/5 rounded-lg mb-4 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <span className="text-3xl">🎬</span>
              </div>
              <h3 className="font-medium text-sm mb-1">{d.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  d.status === '已完成' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>{d.status}</span>
                <span className="text-[10px] text-zinc-500">{d.lang} · {d.eps}集</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">{d.date}</p>
            </div>
          ))}
        </div>

        {demos.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl">📁</span>
            <p className="text-zinc-500 mt-4">暂无素材，去重制工坊创建项目吧</p>
          </div>
        )}
      </div>
    </div>
  );
}
