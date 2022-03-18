import { createContext, ReactNode, useState } from 'react';

interface SofaStateContextData {
    sofaState: boolean;
    setSofaState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SofaStateProps {
    children: ReactNode
}

export const SofaStateContext = createContext({} as SofaStateContextData);

export function SofaStateProvider({ children }: SofaStateProps) {

    const [sofaState, setSofaState] = useState(false)

    return (
        <SofaStateContext.Provider value={{ sofaState, setSofaState }}>
            {children}
        </SofaStateContext.Provider>
    )
}