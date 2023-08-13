import { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';

interface BugButtonProps {
  className?: string;
}

export const BugButton: FC<BugButtonProps> = () => {
  const [bug, setBug] = useState<boolean>();

  useEffect(() => {
    if (bug) {
      throw new Error();
    }
  }, [bug]);

  const throwError = () => setBug((prev) => !prev);

  return (
  // eslint-disable-next-line i18next/no-literal-string
    <Button onClick={throwError}>
      Throw error
    </Button>
  );
};
