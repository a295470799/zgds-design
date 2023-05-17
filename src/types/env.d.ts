/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_URL: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
