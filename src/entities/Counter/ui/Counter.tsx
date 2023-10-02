import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter: FC = () => {
  const { t } = useTranslation('main');
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1 data-testid="counter-value">
        {counterValue}
      </h1>
      <Button data-testid="increment-button" onClick={increment}>
        {t('increment')}
      </Button>
      <Button data-testid="decrement-button" onClick={decrement}>
        {t('decrement')}
      </Button>
    </div>
  );
};
