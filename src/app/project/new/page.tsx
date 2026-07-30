'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadStage from '@/components/upload/upload-stage';
import SettingStage from '@/components/setting/setting-stage';
import StoryboardStage from '@/components/storyboard/storyboard-stage';
import type { Project, ProjectStage } from '@/lib/types';

export default function NewProjectPage() {
  const router = useRouter();
  const [project, setProject] = useState<Project>({
    id: `proj-${Date.now()}`,
    name: '',
    stage: 'upload',
    targetLang: 'en',
    aspectRatio: '9:16',
    resolution: '1080p',
    style: 'realistic',
    createdAt: new Date().toISOString(),
    episodes: [],
    characters: [],
    scenes: [],
    storyboards: [],
  });

  const [step, setStep] = useState<number>(0);

  const updateProject = (patch: Partial<Project>) => {
    setProject((prev) => ({ ...prev, ...patch }));
  };

  const stages: { key: ProjectStage; label: string }[] = [
    { key: 'upload', label: '上传原片' },
    { key: 'setting', label: '设定资产' },
    { key: 'storyboard', label: '分镜重制' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-zinc-800 flex items-center px-6 gap-6 shrink-0">
        <button
          onClick={() => router.push('/')}
          className="text-zinc-400 hover:text-white text-sm"
        >
          ← 返回
        </button>
        <h2 className="font-semibold">
          {project.name || '未命名项目'}
        </h2>
        <div className="flex-1" />

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {stages.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  i === step
                    ? 'text-white'
                    : i < step
                      ? 'text-green-400'
                      : 'text-zinc-500'
                }`}
                style={
                  i === step
                    ? { background: 'var(--color-ark-blue)' }
                    : undefined
                }
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i < step
                      ? 'bg-green-500/20 text-green-400'
                      : i === step
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                {s.label}
              </button>
              {i < stages.length - 1 && (
                <div className="w-4 h-px bg-zinc-700" />
              )}
            </div>
          ))}
        </div>

        <button
          className="px-4 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
        >
          保存草稿
        </button>
      </header>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-6">
        {step === 0 && (
          <UploadStage
            project={project}
            onUpdate={updateProject}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <SettingStage
            project={project}
            onUpdate={updateProject}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StoryboardStage
            project={project}
            onUpdate={updateProject}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
}
