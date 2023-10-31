import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { StarIcon as StarIconDeprecated } from '@/shared/assets/deprecated-icons';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { StarFilledIcon } from '@/shared/assets/redesigned-icons';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { HStack } from '../Stack';
import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const starRating = Array(5).fill(null).map((_, index) => index + 1);

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
      {starRating.map((rating) => {
        const mainClassName = toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls['star-redesigned'],
          off: () => cls.star,
        });

        const hoveredClassName = toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls['hovered-redesigned'],
          off: () => cls.hovered,
        });

        const props = {
          className: classNames(mainClassName, { [hoveredClassName]: currentStarsCount >= rating, [cls.selected]: isSelected }),
          style: { width: size, height: size },
          onMouseLeave: onLeave,
          onMouseEnter: onHover(rating),
          onClick: onSelectRating(rating),
          'data-testid': `StarRating.${rating}`,
          'data-selected': currentStarsCount >= rating,
        };

        return (
          <ToggleFeatures
            key={rating}
            name="isAppRedesigned"
            on={<StarFilledIcon key={rating} {...props} />}
            off={(
              <IconDeprecated
                isFill={false}
                SVG={<StarIconDeprecated {...props} />}
                key={rating}
              />
            )}
          />
        );
      })}
    </HStack>
  );
});
