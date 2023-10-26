import { FC, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  aside: ReactElement;
  toolbar?: ReactElement;
}

export const MainLayout: FC<MainLayoutProps> = ({ className, header, content, aside, toolbar }) => {
  return (
    <div className={classNames(cls.MainLayout, {}, [className])}>
      <div className={cls.aside}>
        {aside}
      </div>
      <div className={cls.content}>
        {content}
      </div>
      <div className={cls.rightbar}>
        <div className={cls.header}>{header}</div>
        <div className={cls.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
};
