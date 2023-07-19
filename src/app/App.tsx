import { FC, Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Aside } from 'widgets/Aside';
import { AppRouter } from './providers/RouterProvider';

const App: FC = () => (
  <div className={classNames('App', {}, [])}>
    <Suspense fallback="">
      <Navbar />
      <div className="content-page">
        <Aside />
        <AppRouter />
      </div>
    </Suspense>
  </div>
);

export default App;
