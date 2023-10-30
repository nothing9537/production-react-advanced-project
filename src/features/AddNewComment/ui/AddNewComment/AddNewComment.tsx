import { FC, FormEvent, memo, useCallback } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { SendIcon } from '@/shared/assets/redesigned-icons';

import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import { addCommentActions, addCommentReducer } from '../../model/slice/addCommentSlice';
import cls from './AddNewComment.module.scss';

const reducers: ReducersList = {
  addCommentForm: addCommentReducer,
};

export interface AddNewCommentProps {
  className?: string;
  onSendComment: (value: string) => void;
}

const AddNewComment: FC<AddNewCommentProps> = memo(({ className, onSendComment }) => {
  const { t } = useAppTranslation('articles');
  const dispatch = useAppDispatch();
  const commentText = useAppSelector(getAddNewCommentText);

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSendComment(commentText || '');
    dispatch(addCommentActions.setText(''));
  }, [commentText, dispatch, onSendComment]);

  /**
   * @deprecated
   */
  const AddNewCommentDeprecated = (
    <HStack component="form" className={classNames(cls.AddNewComment, {}, [className])} onSubmit={onSendHandler}>
      <InputDeprecated
        data-testid="AddNewComment.Input"
        placeholder={t('add-new-comment')}
        onChange={onCommentTextChange}
        value={commentText || ''}
      />
      <ButtonDeprecated type="submit" data-testid="AddNewComment.SubmitButton">
        {t('send-new-comment')}
      </ButtonDeprecated>
    </HStack>
  );

  const AddNewCommentRedesigned = (
    <HStack gap={16} component="form" onSubmit={onSendHandler} className={className}>
      <Input
        data-testid="AddNewComment.Input"
        placeholder={t('add-new-comment')}
        onChange={onCommentTextChange}
        value={commentText || ''}
        size="m"
      />
      <Button
        variant="outlined"
        addonRight={<Icon SVG={<SendIcon />} />}
        type="submit"
        data-testid="AddNewComment.SubmitButton"
      >
        {t('send-new-comment')}
      </Button>
    </HStack>
  );

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <ToggleFeatures
        name="isAppRedesigned"
        on={AddNewCommentRedesigned}
        off={AddNewCommentDeprecated}
      />
    </DynamicModuleWrapper>
  );
});

export default AddNewComment;
