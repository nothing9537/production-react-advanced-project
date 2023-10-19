import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/app/providers/StoreProvider';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
