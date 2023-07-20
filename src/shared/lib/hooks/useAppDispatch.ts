import { AppDispatch } from 'app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
