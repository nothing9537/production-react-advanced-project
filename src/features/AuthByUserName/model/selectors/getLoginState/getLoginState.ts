import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginState = (state: StateSchema) => state?.loginForm || { username: '', password: '', isLoading: false };

// * It's better to create individual selectors for individual fields
