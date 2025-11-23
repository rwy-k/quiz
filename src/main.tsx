import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './features/quiz/store';
import { hydrateFromDB } from './features/quiz/store';
import { loadInitialStateFromDB } from './features/quiz/helpers';

// Load initial state from IndexedDB and hydrate the store
loadInitialStateFromDB().then((initialState) => {
    store.dispatch(hydrateFromDB(initialState));

    // Render app after state is loaded
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
});
