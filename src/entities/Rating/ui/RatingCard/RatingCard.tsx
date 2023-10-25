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
  rate?: number;
  feedback?: {
    title: string;
    placeholder: string;
  }
  onAccept?: (actionRating: number, feedback?: string) => void;
  onCancel?: (actionRating: number) => void;
  'data-testid'?: string;
}

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  const { t } = useAppTranslation('translation');
  const { className, title, onCancel, onAccept, feedback, rate = 0 } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [starsCount, setStarsCount] = useState<number>(rate);

  const onSelectStars = useCallback((rating: number) => {
    setStarsCount(rating);
    if (feedback) {
      setIsModalOpen(true);
    } else {
      onAccept?.(starsCount);
    }
  }, [feedback, onAccept, starsCount]);

  const onClose = useCallback(() => {
    onCancel?.(starsCount);
    setIsModalOpen(false);
  }, [onCancel, starsCount]);

  const onSend = useCallback(() => {
    onAccept?.(starsCount, feedbackMessage);
    setIsModalOpen(false);
  }, [feedbackMessage, onAccept, starsCount]);

  const ratingContent = (
    <>
      <Text title={starsCount ? t('thanks-for-rate') : title} />
      <StarRating selectedStars={starsCount} onSelect={onSelectStars} />
    </>
  );

  const feedbackContent = (
    <>
      <Text title={feedback?.title} />
      <Input
        data-testid="RatingCard.Input"
        placeholder={feedback?.placeholder}
        onChange={setFeedbackMessage}
        value={feedbackMessage}
      />
    </>
  );

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])} data-testid={props['data-testid']}>
      <VStack gap={8} align="center">
        {ratingContent}
      </VStack>
      {feedback && (
        <>
          <BrowserView>
            <Modal isOpen={isModalOpen} onClose={setIsModalOpen} onCloseCallback={onClose}>
              <VStack gap={16} width={550}>
                {feedbackContent}
                <HStack width="100%" gap={16} justify="flex-end">
                  <Button onClick={onSend} data-testid="RatingCard.Send">
                    {t('send')}
                  </Button>
                  <Button theme={ButtonTheme.OUTLINE_RED} onClick={onClose} data-testid="RatingCard.Close">
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
