import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DrawComponentsTree } from '@/shared/lib/components/DrawComponentsTree';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import App from '@/app/App';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

const componentsTree = [BrowserRouter, StoreProvider, ErrorBoundary, ThemeProvider, ForceUpdateProvider, App];

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root node wasn\'t found');
}

const root = createRoot(container);

root.render(DrawComponentsTree(componentsTree));
