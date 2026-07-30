'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [config, setConfig] = useState({
    chatApiUrl: 'https://www.moxing.pro/v1/chat/completions',
    chatApiKey: 'sk-mxai-****2d34',
    chatModel: 'doubao-seed-2-1-pro-260628',
    imageApiUrl: 'https://www.moxing.pro/v1/images/generations',
    imageApiKey: 'sk-mxai-****2d34',
    imageModel: 'doubao-seedream-5-0-pro-260628',
    videoApiUrl: 'https://www.moxing.pro/v1/media/generations',
    videoApiKey: 'sk-mxai-****2d34',
    videoModel: 'doubao-seedance-2-0-mini-260615',
    ttsApiUrl: '',
    ttsApiKey: '',
    ttsModel: '',
  });

  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { key: 'chat', label: '文本/Chat', icon: '💬' },
    { key: 'image', label: '图片生成', icon: '🖼️' },
    { key: 'video', label: '视频生成', icon: '🎬' },
    { key: 'tts', label: '语音合成', icon: '🔊' },
  ];

  const renderFields = (prefix: string) => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-zinc-400 mb-1">API 地址 (Endpoint URL)</label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          placeholder="https://api.example.com/v1/chat/completions"
          value={(config as any)[`${prefix}ApiUrl`]}
          onChange={e => setConfig({...config, [`${prefix}ApiUrl`]: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">API Key</label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
          type="password"
          placeholder="sk-..."
          value={(config as any)[`${prefix}ApiKey`]}
          onChange={e => setConfig({...config, [`${prefix}ApiKey`]: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-xs text-zinc-400 mb-1">模型 ID (Model)</label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          placeholder="doubao-seed-2-1-pro-260628"
          value={(config as any)[`${prefix}Model`]}
          onChange={e => setConfig({...config, [`${prefix}Model`]: e.target.value})}
        />
      </div>
      <button
        className="mt-2 px-4 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-500"
        onClick={() => {
          // Save API config
          if (typeof window !== 'undefined') {
            localStorage.setItem('api-config', JSON.stringify(config));
          }
          alert('API 配置已保存');
        }}
      >
        测试连接 & 保存
      </button>
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">设置</h1>
        <p className="text-sm text-zinc-400 mb-8">自由配置任何大模型 API — 支持 OpenAI 兼容格式</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === t.key ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'
              }`}
              onClick={() => setActiveTab(t.key)}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          {activeTab === 'chat' && (
            <>
              <h3 className="text-sm font-medium mb-4">文本生成 / Chat API 配置</h3>
              {renderFields('chat')}
            </>
          )}
          {activeTab === 'image' && (
            <>
              <h3 className="text-sm font-medium mb-4">图片生成 API 配置</h3>
              {renderFields('image')}
            </>
          )}
          {activeTab === 'video' && (
            <>
              <h3 className="text-sm font-medium mb-4">视频生成 API 配置</h3>
              {renderFields('video')}
            </>
          )}
          {activeTab === 'tts' && (
            <>
              <h3 className="text-sm font-medium mb-4">语音合成 API 配置</h3>
              {renderFields('tts')}
            </>
          )}
        </div>

        <p className="text-xs text-zinc-600 mt-4 text-center">
          支持 OpenAI / 火山方舟 / 墨行AI 等兼容格式的 API。所有密钥仅保存在本地浏览器。
        </p>
      </div>
    </div>
  );
}
