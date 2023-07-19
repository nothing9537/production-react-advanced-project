import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

interface CounterProps {

}

export const Counter: FC<CounterProps> = () => {
  const { t } = useTranslation('main');
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);

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
