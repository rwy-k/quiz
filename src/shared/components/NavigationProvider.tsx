import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { PagePaths } from '../types';

interface NavigationContextType {
    currentPath: string;
    navigate: (path: PagePaths | `${PagePaths}/${string}`) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
    currentPath: window.location.pathname,
    navigate: () => {},
});

interface NavigationProviderProps {
    children: ReactNode;
}

function NavigationProvider({ children }: NavigationProviderProps) {
    const [currentPath, setCurrentPath] = useState(() => {
        const path = window.location.pathname;
        // If path is root, redirect to quiz page
        if (path === '/' || path === '') {
            const redirectPath = `${PagePaths.QUIZ}/1`;
            window.history.replaceState({}, '', redirectPath);
            return redirectPath;
        }
        return path;
    });

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = useCallback(
        (path: PagePaths | `${PagePaths}/${string}`) => {
            if (path !== currentPath) {
                window.history.pushState({}, '', path);
                setCurrentPath(path);
            }
        },
        [currentPath]
    );

    return <NavigationContext.Provider value={{ currentPath, navigate }}>{children}</NavigationContext.Provider>;
}

export default NavigationProvider;
