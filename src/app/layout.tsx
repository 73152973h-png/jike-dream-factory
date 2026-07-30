import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: '金涛即氪梦工厂',
  description: '企业级大模型管理平台 — AI 短剧重制平台',
  icons: { icon: '/icon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-black text-white antialiased flex">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-black/80">{children}</main>
      </body>
    </html>
  );
}
