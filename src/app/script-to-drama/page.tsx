'use client';

import { useState } from 'react';

export default function ScriptToDramaPage() {
  const [script, setScript] = useState('');
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">剧本生短剧</h1>
        <p className="text-sm text-zinc-400 mb-8">
          AI 一键导入剧本，自动提取角色场景，拆解全剧分镜，生成完整短剧
        </p>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['上传剧本', '角色场景', '生成分镜', '预览成片'].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                i === step ? 'bg-blue-600 text-white' : i < step ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-zinc-500'
              }`}>
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-white/20">
                  {i < step ? '✓' : i + 1}
                </span>
                {s}
              </div>
              {i < 3 && <div className="w-6 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Stage 1: Upload */}
        {step === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-lg font-semibold mb-4">上传剧本</h3>
            <p className="text-xs text-zinc-500 mb-6">支持 .txt .doc .docx .pdf 格式，支持标准剧本格式</p>

            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm min-h-[200px] resize-y text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
              placeholder={`第1集
场景1 咖啡厅 - 日

【角色】
林峰 - 男主角，28岁，CEO
苏晴 - 女主角，25岁，设计师

【对话】
林峰：（推开咖啡厅门，扫视）还是老样子。
苏晴：（抬头，微笑）等你很久了。
林峰：（坐下）抱歉，会议拖了太久。

...`}
              value={script}
              onChange={e => setScript(e.target.value)}
            />
            <div className="mt-4 flex gap-3">
              <label className="px-4 py-2 rounded-lg text-sm border border-white/10 text-zinc-400 hover:text-white cursor-pointer hover:border-white/20">
                上传文件
                <input type="file" className="hidden" accept=".txt,.doc,.docx,.pdf" />
              </label>
              <button
                className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
                disabled={!script.trim()}
                onClick={() => setStep(1)}
              >
                开始解析 →
              </button>
            </div>
          </div>
        )}

        {/* Stage 2: Characters & Scenes */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-medium mb-4">识别角色 (2)</h3>
              <div className="grid grid-cols-2 gap-4">
                {[{name:'林峰',desc:'男主角，28岁，CEO，沉稳果断'},{name:'苏晴',desc:'女主角，25岁，设计师，温柔聪明'}].map(c=>(
                  <div key={c.name} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">{c.name[0]}</div>
                    <div>
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-zinc-500">{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setStep(0)} className="px-6 py-2 rounded-lg text-sm border border-white/10 text-zinc-400 hover:text-white">返回</button>
              <button onClick={()=>setStep(2)} className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500">确认，生成分镜 →</button>
            </div>
          </div>
        )}

        {/* Stage 3: Storyboard generation */}
        {step === 2 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-lg font-medium mb-2">分镜生成中...</h3>
            <p className="text-sm text-zinc-500 mb-6">AI 正在拆解剧本，生成分镜画面和视频</p>
            <div className="w-48 h-1.5 bg-white/5 rounded-full mx-auto overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" />
            </div>
            <button onClick={()=>setStep(3)} className="mt-8 px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500">查看成片 →</button>
          </div>
        )}

        {/* Stage 4: Preview */}
        {step === 3 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-6">预览成片</h3>
            <div className="w-72 aspect-[9/16] bg-white/5 border border-white/10 rounded-xl mx-auto flex items-center justify-center mb-8">
              <div className="text-center">
                <span className="text-4xl">🎬</span>
                <p className="text-xs text-zinc-500 mt-2">AI 生成短剧预览</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={()=>setStep(0)} className="px-6 py-2 rounded-lg text-sm border border-white/10 text-zinc-400 hover:text-white">返回修改</button>
              <button className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500">导出成片</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
