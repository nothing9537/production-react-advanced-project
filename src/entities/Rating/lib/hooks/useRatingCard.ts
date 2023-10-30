import { useState, useCallback } from 'react';

interface UseRatingCardOptions {
  onAccept?: (actionRating: number, feedback?: string) => void;
  onCancel?: (actionRating: number) => void;
  feedback?: {
    title: string;
    placeholder: string;
  };
  rate: number;
}

export const useRatingCard = (options: UseRatingCardOptions) => {
  const { onAccept, onCancel, feedback, rate } = options;

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

  return {
    isModalOpen,
    setIsModalOpen,

    feedbackMessage,
    setFeedbackMessage,

    starsCount,
    setStarsCount,

    onSelectStars,
    onClose,
    onSend,
  };
};
