import {createRoot} from 'react-dom/client'
import { App } from './components/app';
import { StrictMode } from 'react';

const root = createRoot(document.querySelector('#root'));
root.render(<StrictMode> <App/> </StrictMode>);

