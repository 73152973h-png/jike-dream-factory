'use client';

import { useCallback, useState } from 'react';
import type { Project, Episode } from '@/lib/types';

interface Props {
  project: Project;
  onUpdate: (patch: Partial<Project>) => void;
  onNext: () => void;
}

export default function UploadStage({ project, onUpdate, onNext }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList) => {
      const newEpisodes: Episode[] = Array.from(files)
        .filter((f) => f.type.startsWith('video/'))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
        .map((file, i) => ({
          id: `ep-${Date.now()}-${i}`,
          name: file.name,
          file,
          status: 'pending' as const,
        }));
      onUpdate({ episodes: [...project.episodes, ...newEpisodes] });
    },
    [project.episodes, onUpdate],
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Project config */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">项目配置</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ConfigField label="项目名称">
            <input
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="输入项目名称"
              value={project.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </ConfigField>
          <ConfigField label="目标语言">
            <select
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
              value={project.targetLang}
              onChange={(e) => onUpdate({ targetLang: e.target.value })}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="th">ไทย</option>
              <option value="vi">Tiếng Việt</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ar">العربية</option>
              <option value="tr">Türkçe</option>
              <option value="ru">Русский</option>
              <option value="hi">हिन्दी</option>
              <option value="zh">中文（普通话）</option>
            </select>
          </ConfigField>
          <ConfigField label="画面比例">
            <select
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
              value={project.aspectRatio}
              onChange={(e) => onUpdate({ aspectRatio: e.target.value })}
            >
              <option value="9:16">9:16 (竖屏)</option>
              <option value="16:9">16:9 (横屏)</option>
              <option value="1:1">1:1 (方形)</option>
              <option value="4:3">4:3</option>
              <option value="3:4">3:4</option>
            </select>
          </ConfigField>
          <ConfigField label="画面风格">
            <select
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
              value={project.style}
              onChange={(e) => onUpdate({ style: e.target.value })}
            >
              <option value="realistic">写实</option>
              <option value="anime">动漫</option>
              <option value="3d">3D 渲染</option>
              <option value="watercolor">水彩</option>
              <option value="oil">油画</option>
              <option value="sketch">素描</option>
              <option value="cyberpunk">赛博朋克</option>
              <option value="fantasy">奇幻</option>
            </select>
          </ConfigField>
        </div>
      </div>

      {/* Upload area */}
      <div>
        <h3 className="text-lg font-semibold mb-4">上传剧集视频</h3>
        <p className="text-xs text-zinc-500 mb-3">
          支持 mp4/mov，单文件 ≤500MB，视频名需含集数编号。建议全集一次性上传。
        </p>

        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragOver
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-zinc-700 hover:border-zinc-500'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
          }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'video/mp4,video/mov';
            input.multiple = true;
            input.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files;
              if (files?.length) handleFiles(files);
            };
            input.click();
          }}
        >
          <div className="text-4xl mb-3">🎥</div>
          <p className="text-zinc-300 font-medium">
            拖拽视频到此处，或点击选择文件
          </p>
          <p className="text-zinc-500 text-xs mt-1">
            支持 mp4 / mov 格式
          </p>
        </div>

        {/* Episode list */}
        {project.episodes.length > 0 && (
          <div className="mt-4 space-y-2">
            {project.episodes.map((ep) => (
              <div
                key={ep.id}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
              >
                <span className="text-xs text-zinc-500 w-8">
                  {ep.status === 'parsed' ? '✅' : '📄'}
                </span>
                <span className="text-sm flex-1 truncate">{ep.name}</span>
                <span className="text-xs text-zinc-500">
                  {ep.status === 'pending' && '待上传'}
                  {ep.status === 'uploaded' && '已上传'}
                  {ep.status === 'parsing' && '解析中...'}
                  {ep.status === 'parsed' && '已解析'}
                </span>
                <button
                  className="text-xs text-red-400 hover:text-red-300"
                  onClick={() =>
                    onUpdate({
                      episodes: project.episodes.filter((e) => e.id !== ep.id),
                    })
                  }
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        {project.episodes.length > 0 && (
          <div className="mt-6 flex gap-3">
            <button
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: 'var(--color-ark-blue)',
                color: 'white',
              }}
              onClick={() => {
                // Mark as parsing → in production this triggers the Agent
                onUpdate({
                  episodes: project.episodes.map((ep) => ({
                    ...ep,
                    status: 'parsing' as const,
                  })),
                });
                // Simulate parsing delay then move to next
                setTimeout(() => {
                  onUpdate({
                    episodes: project.episodes.map((ep) => ({
                      ...ep,
                      status: 'parsed' as const,
                    })),
                  });
                  onNext();
                }, 2000);
              }}
            >
              开始解析 & 进入设定
            </button>
            <button
              className="px-6 py-2.5 rounded-lg text-sm border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
              onClick={() =>
                onUpdate({
                  episodes: [],
                })
              }
            >
              清空全部
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ConfigField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-zinc-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
