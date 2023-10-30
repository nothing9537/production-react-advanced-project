import { FC } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Input } from '@/shared/ui/deprecated/Input';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';

import { RatingCardProps } from '../../../model/types/component';
import { useRatingCard } from '../../../lib/hooks/useRatingCard';

export const RatingCardDeprecated: FC<RatingCardProps> = (props) => {
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
      />
    </>
  );

  return (
    <Card
      className={className}
      data-testid={dataTestId}
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
};
