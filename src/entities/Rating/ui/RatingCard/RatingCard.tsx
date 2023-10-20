import { FC, memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import cls from './RatingCard.module.scss';

interface RatingCardProps {
  className?: string;
  title: string;
  feedback?: {
    title: string;
    placeholder: string;
  }
  onAcceptFeedback?: (actionRating: number, feedback?: string) => void;
  onCancelFeedback?: (actionRating: number) => void;
}

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  const { t } = useAppTranslation('translation');
  const { className, title, onCancelFeedback, onAcceptFeedback, feedback } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [starsCount, setStarsCount] = useState<number>(0);

  const onSelectStars = useCallback((rating: number) => {
    setStarsCount(rating);
    if (feedback) {
      setIsModalOpen(true);
    } else {
      onAcceptFeedback?.(starsCount);
    }
  }, [feedback, onAcceptFeedback, starsCount]);

  const onClose = useCallback(() => {
    onCancelFeedback?.(starsCount);
    setIsModalOpen(false);
  }, [onCancelFeedback, starsCount]);

  const onSend = useCallback(() => {
    onAcceptFeedback?.(starsCount, feedbackMessage);
    setIsModalOpen(false);
  }, [feedbackMessage, onAcceptFeedback, starsCount]);

  const ratingContent = (
    <>
      <Text title={title} />
      <StarRating onSelect={onSelectStars} />
    </>
  );

  const feedbackContent = (
    <>
      <Text title={feedback?.title} />
      <Input placeholder={feedback?.placeholder} onChange={setFeedbackMessage} value={feedbackMessage} />
    </>
  );

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack gap={8} align="center">
        {ratingContent}
      </VStack>
      {feedback && (
        <>
          <BrowserView>
            <Modal isOpen={isModalOpen} onClose={setIsModalOpen} onCloseCallback={onClose}>
              <VStack gap={16} width={300}>
                {feedbackContent}
                <HStack width="100%" gap={16} justify="flex-end">
                  <Button onClick={onSend}>
                    {t('send')}
                  </Button>
                  <Button theme={ButtonTheme.OUTLINE_RED} onClick={onClose}>
                    {t('close')}
                  </Button>
                </HStack>
              </VStack>
            </Modal>
          </BrowserView>
          <MobileView>
            <VStack gap={24} align="center">
              {ratingContent}
              <Drawer
                root="form"
                onClose={onClose}
                component={(
                  <Button>
                    {t('let-your-feedback')}
                  </Button>
                )}
              >
                <VStack gap={16}>
                  {feedbackContent}
                  <Button onClick={onSend} fullWidth type="submit">
                    {t('send')}
                  </Button>
                </VStack>
              </Drawer>
            </VStack>
          </MobileView>
        </>
      )}
    </Card>
  );
});
