import { FC, memo, useCallback } from 'react';
import { CopyIcon } from '@/shared/assets/deprecated-icons';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  code: string;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Code: FC<CodeProps> = memo(({ className, code }) => {
  const onCopyClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button theme={ButtonTheme.CLEAR} className={cls['copy-btn']} onClick={onCopyClipboard}>
        <CopyIcon className={cls.icon} />
      </Button>
      <code>
        {code}
      </code>
    </pre>
  );
});
