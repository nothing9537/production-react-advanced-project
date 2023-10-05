import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import { renderComponents } from 'shared/lib/components/drawComponentsTree';
import App from './app/App';
import 'app/styles/index.scss';
import 'shared/config/i18n/i18n';

const componentsTree = [BrowserRouter, StoreProvider, ErrorBoundary, ThemeProvider, App];

render(renderComponents(componentsTree), document.getElementById('root'));
