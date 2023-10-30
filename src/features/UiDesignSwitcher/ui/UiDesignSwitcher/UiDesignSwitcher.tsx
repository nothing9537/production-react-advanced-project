import { FC, memo, useCallback, useMemo, useState } from 'react';
import { getFeatureFlags, ToggleFeatures, updateFeatureFlags } from '@/shared/lib/features';
import { ListBox, ListBoxOption } from '@/shared/ui/redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { useUserAuthData } from '@/entities/User';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher: FC<UiDesignSwitcherProps> = memo(({ className }) => {
  const { t } = useAppTranslation('settings');
  const isAppRedesigned = getFeatureFlags('isAppRedesigned');
  const userData = useUserAuthData();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const options = useMemo<ListBoxOption<string>[]>(() => ([
    {
      content: t('new-design'),
      value: 'new',
    },
    {
      content: t('old-design'),
      value: 'old',
    },
  ]), [t]);

  const onDesignChange = useCallback(async (value: string) => {
    if (userData?.id) {
      setIsLoading(true);

      await dispatch(updateFeatureFlags({
        userId: userData?.id,
        newFeatures: {
          ...userData.features,
          isAppRedesigned: value === 'new',
        },
      })).unwrap();

      setIsLoading(false);
    }
  }, [userData, dispatch]);

  if (isLoading) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<Skeleton height={38} width="100%" />}
        off={<SkeletonDeprecated height={38} width="100%" />}
      />
    );
  }

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <ListBox
          onChange={onDesignChange}
          placeholder={t('design-variant')}
          value={isAppRedesigned ? 'new' : 'old'}
          className={className}
          options={options}
        />
      )}
      off={(
        <ListBoxDeprecated
          onChange={onDesignChange}
          placeholder={t('design-variant')}
          value={isAppRedesigned ? 'new' : 'old'}
          className={className}
          options={options}
        />
      )}
    />
  );
});
