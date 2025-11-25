import { useContext } from 'react';
import { NavigationContext } from './NavigationProvider';
import { PagePaths } from '../types';
import type { ReactNode } from 'react';

interface RouteProps {
    href: PagePaths | `${PagePaths}/:${string}`;
    children: ReactNode;
}

function Route({ href, children }: RouteProps) {
    const { currentPath } = useContext(NavigationContext);

    const isMatch = currentPath === href || currentPath.startsWith(href + '/');

    return isMatch ? <>{children}</> : null;
}
export default Route;
