import { FC, FormEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { addCommentActions, addCommentReducer } from '../../model/slice/addCommentSlice';
import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import cls from './AddNewComment.module.scss';

const reducers: ReducersList = {
  addCommentForm: addCommentReducer,
};

export interface AddNewCommentProps {
  className?: string;
  onSendComment: (value: string) => void;
}

const AddNewComment: FC<AddNewCommentProps> = memo(({ className, onSendComment }) => {
  const { t } = useTranslation('articles');
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

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <HStack component="form" className={classNames(cls.AddNewComment, {}, [className])} onSubmit={onSendHandler}>
        <Input
          data-testid="AddNewComment.Input"
          placeholder={t('add-new-comment')}
          onChange={onCommentTextChange}
          value={commentText || ''}
        />
        <Button type="submit" data-testid="AddNewComment.SubmitButton">
          {t('send-new-comment')}
        </Button>
      </HStack>
    </DynamicModuleWrapper>
  );
});

export default AddNewComment;
