import { useTranslation } from 'react-i18next';
import { TranslationNamespacesKeys } from "../../types/translation";

export const useAppTranslation = useTranslation<TranslationNamespacesKeys>;
