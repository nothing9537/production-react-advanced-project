import { FC, FormEvent, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
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
      <form className={classNames(cls.AddNewComment, {}, [className])} onSubmit={onSendHandler}>
        <Input
          placeholder={t('add-new-comment')}
          onChange={onCommentTextChange}
          value={commentText || ''}
        />
        <Button type="submit">
          {t('send-new-comment')}
        </Button>
      </form>
    </DynamicModuleWrapper>
  );
});

export default AddNewComment;