// ========== Project ==========
export type ProjectStage = 'upload' | 'setting' | 'storyboard' | 'done';

export interface Project {
  id: string;
  name: string;
  stage: ProjectStage;
  targetLang: string;
  aspectRatio: string;
  resolution: string;
  style: string;
  createdAt: string;
  episodes: Episode[];
  characters: Character[];
  scenes: Scene[];
  storyboards: Storyboard[];
}

// ========== Episode ==========
export interface Episode {
  id: string;
  name: string;
  file: File | null;
  fileUrl?: string;
  duration?: number;
  status: 'pending' | 'uploading' | 'uploaded' | 'parsing' | 'parsed' | 'error';
}

// ========== Character ==========
export interface Character {
  id: string;
  originalName: string;
  originalImage?: string;
  newName: string;
  newPrompt: string;
  newImage?: string;
  costumes: Costume[];
  episodes: string[]; // episode IDs where this character appears
}

export interface Costume {
  id: string;
  name: string;
  description: string;
  prompt: string;
  image?: string;
}

// ========== Scene ==========
export interface Scene {
  id: string;
  originalName: string;
  newName: string;
  newPrompt: string;
  newImage?: string;
}

// ========== Storyboard ==========
export interface Storyboard {
  id: string;
  episodeId: string;
  index: number;
  timeRange: { start: number; end: number };
  prompt: string;
  status: 'pending' | 'generating_image' | 'image_done' | 'generating_video' | 'done' | 'error';
  sketchImage?: string;
  renderImage?: string;
  videoUrl?: string;
  originalKeyframes: string[];
  usedCharacters: string[];
  usedScenes: string[];
}

// ========== API types ==========
export interface ArkChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | ArkContentPart[];
}

export interface ArkContentPart {
  type: 'text' | 'image_url' | 'video_url';
  text?: string;
  image_url?: { url: string };
  video_url?: { url: string };
}
