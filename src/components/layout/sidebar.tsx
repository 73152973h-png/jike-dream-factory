'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: '🏠', label: '首页', href: '/' },
  { icon: '🎬', label: '重制工坊', href: '/project/new' },
  { icon: '📝', label: '剧本生短剧', href: '/script-to-drama' },
  { icon: '📁', label: '素材库', href: '/assets' },
  { icon: '⚙️', label: '设置', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-black/90 backdrop-blur-sm h-screen flex flex-col text-zinc-300 shrink-0 border-r border-white/5 z-10">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <h1 className="text-lg font-bold text-white tracking-wide">
          即氪梦工厂
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">Jike Dream Factory</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Scrolling model tags */}
      <div className="px-3 py-3 border-t border-white/5 overflow-hidden">
        <div className="text-xs text-zinc-500 mb-2">已接入模型</div>
        <div className="flex flex-wrap gap-1.5">
          {['Seedance','Seedream','Kling','Qwen','Kimi','GLM','文心一言','百川','DeepSeek','GPT-4o','Claude','Gemini'].map(m=>(
            <span key={m} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-zinc-500">{m}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/5 text-xs text-zinc-500">
        Powered by 即氪梦工厂
      </div>
    </aside>
  );
}
