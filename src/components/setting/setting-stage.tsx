'use client';

import { useState } from 'react';
import type { Project, Character, Costume, Scene } from '@/lib/types';

interface Props {
  project: Project;
  onUpdate: (patch: Partial<Project>) => void;
  onBack: () => void;
  onNext: () => void;
}

// Demo characters that would come from video parsing
const demoCharacters: Character[] = [
  {
    id: 'char-1',
    originalName: '男主角',
    newName: 'Alex',
    newPrompt: 'A young Asian man in his late 20s, sharp suit, confident expression, CEO style, cinematic lighting',
    costumes: [
      {
        id: 'cost-1-1',
        name: '西装革履',
        description: '黑色西装',
        prompt: 'black tailored suit, white shirt, tie',
      },
      {
        id: 'cost-1-2',
        name: '休闲装扮',
        description: '休闲外套',
        prompt: 'casual jacket, t-shirt, relaxed look',
      },
    ],
    episodes: ['ep-1', 'ep-2'],
  },
  {
    id: 'char-2',
    originalName: '女主角',
    newName: 'Sophia',
    newPrompt: 'A young Asian woman in her mid 20s, elegant dress, warm smile, soft cinematic lighting, fashion editorial style',
    costumes: [],
    episodes: ['ep-1'],
  },
];

const demoScenes: Scene[] = [
  {
    id: 'scene-1',
    originalName: '办公室',
    newName: 'Modern Office',
    newPrompt: 'A sleek modern office with floor-to-ceiling windows, minimalist design, overlooking city skyline',
  },
  {
    id: 'scene-2',
    originalName: '咖啡厅',
    newName: 'Cafe',
    newPrompt: 'A cozy upscale cafe, warm ambient lighting, wooden furniture, barista counter',
  },
];

export default function SettingStage({ project, onUpdate, onBack, onNext }: Props) {
  const [characters] = useState<Character[]>(
    project.characters.length ? project.characters : demoCharacters,
  );
  const [scenes] = useState<Scene[]>(
    project.scenes.length ? project.scenes : demoScenes,
  );
  const [editingCharId, setEditingCharId] = useState<string | null>(null);

  const handleSmartOptimize = (char: Character) => {
    // Simulate LLM optimization of the prompt
    const improved = `${char.newPrompt}, professional photography, 8K resolution, highly detailed`;
    onUpdate({
      characters: (project.characters.length ? project.characters : demoCharacters).map((c) =>
        c.id === char.id ? { ...c, newPrompt: improved } : c,
      ),
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">资产设定</h3>
          <p className="text-xs text-zinc-500 mt-1">
            确认角色、场景的替换关系，优化提示词
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500">
            + 添加角色
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500">
            + 添加场景
          </button>
        </div>
      </div>

      {/* Characters */}
      <section className="mb-8">
        <h4 className="text-sm font-medium text-zinc-400 mb-4">
          角色 ({characters.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char) => (
            <div
              key={char.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium">
                  {char.newName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">
                      {char.newName}
                    </span>
                    <span className="text-xs text-zinc-500">
                      ← {char.originalName}
                    </span>
                  </div>
                  {char.costumes.length > 0 && (
                    <span className="text-xs text-zinc-500">
                      {char.costumes.length} 套变装
                    </span>
                  )}
                </div>
                <button
                  className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-white"
                  onClick={() =>
                    setEditingCharId(
                      editingCharId === char.id ? null : char.id,
                    )
                  }
                >
                  {editingCharId === char.id ? '收起' : '编辑'}
                </button>
              </div>

              {/* Prompt */}
              <div className="text-xs text-zinc-500 mb-2 line-clamp-2">
                {char.newPrompt}
              </div>

              {/* Expanded edit */}
              {editingCharId === char.id && (
                <div className="mt-3 space-y-3 pt-3 border-t border-zinc-800">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      新角色名
                    </label>
                    <input
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
                      defaultValue={char.newName}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      形象提示词
                    </label>
                    <textarea
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm min-h-[80px] resize-y"
                      defaultValue={char.newPrompt}
                    />
                    <button
                      className="mt-2 text-xs px-3 py-1 rounded-lg"
                      style={{
                        background: 'var(--color-ark-blue)',
                        color: 'white',
                      }}
                      onClick={() => handleSmartOptimize(char)}
                    >
                      ✨ 智能优化
                    </button>
                  </div>
                  {/* Costumes */}
                  {char.costumes.length > 0 && (
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">
                        变装
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {char.costumes.map((c) => (
                          <span
                            key={c.id}
                            className="text-xs bg-zinc-800 px-2 py-1 rounded"
                          >
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button className="text-xs text-zinc-500 hover:text-white">
                  合并去重
                </button>
                <button className="text-xs text-zinc-500 hover:text-white">
                  合入变装
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scenes */}
      <section className="mb-8">
        <h4 className="text-sm font-medium text-zinc-400 mb-4">
          场景 ({scenes.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium">{scene.newName}</span>
                <span className="text-xs text-zinc-500">
                  ← {scene.originalName}
                </span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2">
                {scene.newPrompt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom actions */}
      <div className="flex gap-3 pt-4 border-t border-zinc-800">
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg text-sm border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          返回上传
        </button>
        <button
          onClick={() => {
            // In production, save settings and trigger storyboard parsing
            onNext();
          }}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ background: 'var(--color-ark-blue)' }}
        >
          确认设定，进入分镜解析
        </button>
      </div>
    </div>
  );
}
