import { FC } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button';

import { RatingCardProps } from '../../../model/types/component';
import { useRatingCard } from '../../../lib/hooks/useRatingCard';

export const RatingCardRedesigned: FC<RatingCardProps> = (props) => {
  const { t } = useAppTranslation('translation');
  const { className, title, onCancel, onAccept, feedback, 'data-testid': dataTestId = '', rate = 0 } = props;

  const {
    setFeedbackMessage,
    feedbackMessage,
    starsCount,
    onClose,
    onSelectStars,
    onSend,
    isModalOpen,
    setIsModalOpen,
  } = useRatingCard({ onAccept, onCancel, rate, feedback });

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
        size="l"
      />
    </>
  );

  return (
    <Card
      className={className}
      data-testid={dataTestId}
      borderRadius={32}
      padding="24"
      fullWidth
    >
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
                  <Button variant="outlined" color="success" onClick={onSend} data-testid="RatingCard.Send">
                    {t('send')}
                  </Button>
                  <Button variant="outlined" color="cancel" onClick={onClose} data-testid="RatingCard.Close">
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
};
