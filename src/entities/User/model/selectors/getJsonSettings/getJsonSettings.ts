import { buildSelector } from '@/shared/lib/store';

export const [useJsonSettings, getJsonSettings] = buildSelector((state) => state.user?.authData?.jsonSettings);
