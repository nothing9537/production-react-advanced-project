import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { classNames } from 'shared/lib/classNames/classNames';
import { Profile, ProfileCard } from 'entities/Profile';
import { VStack } from 'shared/ui/Stack';
import { ProfilePageHeader } from '../Header/Header';

interface EditableProfileCardProps {
  className?: string;
  formData?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = ({ className, formData, error, isLoading, readonly }) => {
  const { control, setValue, getValues, reset, formState: { isValid } } = useForm<Profile>({ mode: 'all', defaultValues: formData });

  return (
    <VStack gap={24} className={classNames('', {}, [className])}>
      <ProfilePageHeader
        profileData={formData}
        readonly={readonly}
        getValues={getValues}
        reset={reset}
        isValid={isValid}
      />
      <ProfileCard
        data={formData}
        isLoading={isLoading}
        error={error}
        readonly={readonly}
        control={control}
        setValue={setValue}
      />
    </VStack>
  );
};
