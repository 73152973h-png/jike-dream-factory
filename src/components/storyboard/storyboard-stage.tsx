'use client';

import { useState } from 'react';
import type { Project, Storyboard } from '@/lib/types';

interface Props {
  project: Project;
  onUpdate: (patch: Partial<Project>) => void;
  onBack: () => void;
}

// Demo storyboards (in production, parsed from video)
const demoStoryboards: Storyboard[] = Array.from({ length: 8 }, (_, i) => ({
  id: `sb-${i + 1}`,
  episodeId: 'ep-1',
  index: i + 1,
  timeRange: { start: i * 15, end: (i + 1) * 15 },
  prompt: i % 2 === 0
    ? 'Alex walks into the modern office, confident stride, morning sunlight streaming through windows'
    : 'Sophia sits at cafe table, looking at her phone, warm ambient lighting, shallow depth of field',
  status: 'pending' as const,
  originalKeyframes: [],
  usedCharacters: i % 2 === 0 ? ['char-1'] : ['char-2'],
  usedScenes: i % 2 === 0 ? ['scene-1'] : ['scene-2'],
}));

export default function StoryboardStage({ project, onUpdate, onBack }: Props) {
  const [storyboards] = useState<Storyboard[]>(
    project.storyboards.length ? project.storyboards : demoStoryboards,
  );
  const [selectedSb, setSelectedSb] = useState<string>(storyboards[0]?.id || '');
  const [mode, setMode] = useState<'sketch' | 'render' | 'video'>('render');
  const [generating, setGenerating] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  const current = storyboards.find((sb) => sb.id === selectedSb);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate Seedream / Seedance generation
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(false);
  };

  return (
    <div className="flex h-full gap-4" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Left sidebar — episode list + assets */}
      <div className="w-56 shrink-0 flex flex-col gap-4">
        {/* Episodes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <h4 className="text-xs font-medium text-zinc-400 mb-2">剧集</h4>
          {['第 1 集', '第 2 集', '第 3 集'].map((ep, i) => (
            <div
              key={i}
              className={`text-xs py-1.5 px-2 rounded cursor-pointer ${
                i === 0 ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {i === 0 ? '✅ ' : ''}{ep}
            </div>
          ))}
        </div>

        {/* Characters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <h4 className="text-xs font-medium text-zinc-400 mb-2">角色</h4>
          {['Alex', 'Sophia'].map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 text-xs py-1.5 text-zinc-400"
            >
              <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px]">
                {name[0]}
              </div>
              <span>@{name}</span>
            </div>
          ))}
        </div>

        {/* Scenes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
          <h4 className="text-xs font-medium text-zinc-400 mb-2">场景</h4>
          {['Modern Office', 'Cafe'].map((name) => (
            <div
              key={name}
              className="text-xs py-1.5 text-zinc-400 cursor-pointer hover:text-white"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Center — storyboard editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Prompt editor */}
        {current && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-zinc-400">
                分镜 #{current.index}
              </span>
              <span className="text-xs text-zinc-600">
                {current.timeRange.start}s - {current.timeRange.end}s
              </span>
            </div>
            <textarea
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm min-h-[60px] resize-y"
              defaultValue={current.prompt}
            />
            <div className="flex items-center gap-2 mt-3">
              {/* Mode selector */}
              <div className="flex bg-zinc-800 rounded-lg p-0.5">
                {(['sketch', 'render', 'video'] as const).map((m) => (
                  <button
                    key={m}
                    className={`px-3 py-1 rounded-md text-xs ${
                      mode === m
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    style={
                      mode === m
                        ? { background: 'var(--color-ark-blue)' }
                        : undefined
                    }
                    onClick={() => setMode(m)}
                  >
                    {m === 'sketch' ? '草图' : m === 'render' ? '渲染' : '视频'}
                  </button>
                ))}
              </div>
              <div className="flex-1" />
              <button
                className="px-4 py-1.5 rounded-lg text-xs font-medium text-white disabled:opacity-50"
                style={{ background: 'var(--color-ark-blue)' }}
                disabled={generating}
                onClick={handleGenerate}
              >
                {generating
                  ? '生成中...'
                  : mode === 'sketch'
                    ? '生成草图'
                    : mode === 'render'
                      ? '生成渲染图'
                      : '生成视频'}
              </button>
            </div>
          </div>
        )}

        {/* Preview area */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center relative overflow-hidden">
          {compareMode ? (
            /* Side-by-side comparison */
            <div className="flex w-full h-full">
              <div className="flex-1 flex flex-col items-center justify-center border-r border-zinc-800 p-4">
                <span className="text-xs text-zinc-500 mb-2">原片</span>
                <div className="w-full aspect-[9/16] max-h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-600 text-sm">原片播放器</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <span className="text-xs text-green-500 mb-2">新片</span>
                <div className="w-full aspect-[9/16] max-h-full bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-600 text-sm">重制后播放器</span>
                </div>
              </div>
            </div>
          ) : (
            /* Single preview */
            <div className="flex flex-col items-center gap-3">
              <div className="w-64 aspect-[9/16] bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                <div className="text-center">
                  <span className="text-3xl">
                    {mode === 'sketch' ? '✏️' : mode === 'render' ? '🖼️' : '🎬'}
                  </span>
                  <p className="text-xs text-zinc-500 mt-2">
                    {generating
                      ? 'AI 生成中...'
                      : mode === 'sketch'
                        ? '草图预览区'
                        : mode === 'render'
                          ? '渲染图预览区'
                          : '视频预览区'}
                  </p>
                </div>
              </div>
              <button
                className="text-xs text-zinc-500 hover:text-white"
                onClick={() => setCompareMode(!compareMode)}
              >
                {compareMode ? '关闭对比' : '对比原片'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right — storyboard timeline */}
      <div className="w-48 shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl p-3 overflow-auto">
        <h4 className="text-xs font-medium text-zinc-400 mb-3">分镜列表</h4>
        <div className="space-y-2">
          {storyboards.map((sb) => (
            <button
              key={sb.id}
              className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors ${
                selectedSb === sb.id
                  ? 'bg-blue-500/10 border border-blue-500/30 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800'
              }`}
              onClick={() => setSelectedSb(sb.id)}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">#{sb.index}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    sb.status === 'done'
                      ? 'bg-green-500'
                      : sb.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-zinc-600'
                  }`}
                />
              </div>
              <p className="text-zinc-500 truncate">{sb.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div className="fixed bottom-6 left-72">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg text-sm border border-zinc-700 text-zinc-400 hover:text-white transition-colors bg-zinc-950"
        >
          ← 返回设定
        </button>
      </div>
    </div>
  );
}
