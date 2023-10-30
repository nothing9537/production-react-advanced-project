import { FC, memo, useEffect, useState } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import cls from './ArticlePageGreetings.module.scss';

export const ArticlePageGreetings: FC = memo(() => {
  const { t } = useAppTranslation('articles');
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isArticlesPageWasOpenedOnce } = useJsonSettings();

  useEffect(() => {
    if (!isArticlesPageWasOpenedOnce) {
      setIsModalOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpenedOnce: true }));
    }
  }, [isArticlesPageWasOpenedOnce, dispatch]);

  return (
    <Modal isOpen={isModalOpen} onClose={setIsModalOpen} className={cls.ArticlePageGreetings}>
      <VStack>
        <Text title={t('welcome')} text={t('welcome-message-description')} />
      </VStack>
    </Modal>
  );
});
