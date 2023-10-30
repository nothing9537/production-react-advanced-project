import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useUserAuthData, getUserAuthData] = buildSelector((state: StateSchema) => state.user?.authData);
