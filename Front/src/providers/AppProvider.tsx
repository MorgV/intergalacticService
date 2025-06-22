// src/app/providers/AppProvider.tsx
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppStore } from '../state/useAppStore';

type Props = {
    children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
    const loadHistory = useAppStore((state) => state.loadHistory);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    return <>{children}</>;
};

export default AppProviders;
