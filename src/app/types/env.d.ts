/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IS_DEV: boolean;
  readonly VITE_PROJECT: 'storybook' | 'frontend' | 'jest';
  readonly VITE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
