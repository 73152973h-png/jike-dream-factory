import { NextRequest, NextResponse } from 'next/server';

/**
 * Download API — redirects to the latest release or serves the desktop app.
 */
export async function GET(req: NextRequest) {
  const platform = req.nextUrl.searchParams.get('platform') || 'windows';

  // In production, this should serve a real binary or redirect to GitHub Releases
  return NextResponse.json({
    platform,
    version: '1.0.0',
    message: `下载链接：当前为网页版，桌面客户端请访问 GitHub Releases 获取。`,
    downloadUrl:
      platform === 'macos'
        ? 'https://github.com/73152973h-png/jike-dream-factory/releases'
        : 'https://github.com/73152973h-png/jike-dream-factory/releases',
  });
}
