import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onUnauthorized } from '@/services/api/client';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { AppProviders } from './providers/AppProviders';
import AppRoutes from './router/AppRoutes';

function App() {
    useEffect(() => {
        const unsubscribe = onUnauthorized(() => {
            useAuthStore.getState().logout();
        });
        return unsubscribe;
    }, []);

    return (
        <AppProviders>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AppProviders>
    );
}

export default App;
