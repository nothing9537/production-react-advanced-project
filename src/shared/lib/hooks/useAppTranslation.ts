import { useTranslation } from 'react-i18next';
import { TranslationNamespacesKeys } from '../../types';

export const useAppTranslation = useTranslation<TranslationNamespacesKeys>;
