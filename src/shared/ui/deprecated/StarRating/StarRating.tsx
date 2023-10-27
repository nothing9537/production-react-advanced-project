import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { StarIcon } from '@/shared/assets/deprecated-icons';
import { Icon } from '../Icon';
import { HStack } from '../../redesigned/Stack';
import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const starRating = Array(5).fill(null).map((_, index) => index + 1);
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const StarRating: FC<StarRatingProps> = memo(({ className, onSelect, size = 30, selectedStars = 0 }) => {
  const [currentStarsCount, setCurrentStarsCount] = useState<number>(selectedStars);
  const [isSelected, setIsSelected] = useState<boolean>(Boolean(selectedStars));

  const onHover = useCallback((rating: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(rating);
    }
  }, [isSelected]);

  const onLeave = useCallback(() => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  }, [isSelected]);

  const onSelectRating = useCallback((rating: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(rating);
      setIsSelected(true);
      onSelect?.(rating);
    }
  }, [onSelect, isSelected]);

  return (
    <HStack className={classNames(cls.StarRating, {}, [className])} width="fit-content">
      {starRating.map((rating) => (
        <Icon
          isFill={false}
          SVG={(
            <StarIcon
              className={classNames(cls.star, { [cls.hovered]: currentStarsCount >= rating, [cls.selected]: isSelected })}
              style={{ width: size, height: size }}
              onMouseLeave={onLeave}
              onMouseEnter={onHover(rating)}
              onClick={onSelectRating(rating)}
              data-testid={`StarRating.${rating}`}
              data-selected={currentStarsCount >= rating}
            />
          )}
          key={rating}
        />
      ))}
    </HStack>
  );
});
