module.exports = (componentName) => `import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './${componentName}.module.scss';

interface ${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<${componentName}Props> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.${componentName}, {}, [className])}>
      {t('${componentName}')}
    </div>
  );
});
`;
