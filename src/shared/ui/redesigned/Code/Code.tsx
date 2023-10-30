import { FC, memo, useCallback } from 'react';
import { CopyIcon as CopyIconDeprecated } from '@/shared/assets/deprecated-icons';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { CopyIcon } from '@/shared/assets/redesigned-icons';

import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import { Icon } from '../Icon';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  code: string;
}

export const Code: FC<CodeProps> = memo(({ className, code }) => {
  const onCopyClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon SVG={<CopyIcon />} clickable onClick={onCopyClipboard} className={cls['copy-btn']} />
          <code>
            {code}
          </code>
        </pre>
      )}
      off={(
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button theme={ButtonTheme.CLEAR} className={cls['copy-btn']} onClick={onCopyClipboard}>
            <CopyIconDeprecated className={cls.icon} />
          </Button>
          <code>
            {code}
          </code>
        </pre>
      )}
    />
  );
});
