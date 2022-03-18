import { createContext, ReactNode, useState } from 'react';

interface UserStateContextData {
    userState: boolean;
    setUserState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserStateProps {
    children: ReactNode
}

export const UserStateContext = createContext({} as UserStateContextData);

export function UserStateProvider({ children }: UserStateProps) {

    const [userState, setUserState] = useState(false)

    return (
        <UserStateContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserStateContext.Provider>
    )
}