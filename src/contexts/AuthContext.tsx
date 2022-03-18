import { createContext, ReactNode, useEffect, useState } from 'react';
import { login, checkAuth, getToken, getUser, register } from '../services/auth.service';
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import api from '../services/api';

interface User {
    username: string;
    email: string;
    role: 'user' | 'admin';
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials extends SignInCredentials {
    username: string;
}

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    signUp(credentials: SignUpCredentials): Promise<void>;
    user?: User;
    isAuthenticated: () => Promise<boolean>;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const token = getToken();
        const loggedUser = getUser();

        if (token && loggedUser) {
            setUser({
                username: loggedUser.username,
                email: loggedUser.email,
                role: loggedUser.role
            })
        }
    }, [])

    async function isAuthenticated() {
        return checkAuth();
    }

    async function signIn({ email, password }: SignInCredentials) {

        try {

            const response = await login(email, password);
            console.log(response)

            const { role, username } = response

            setUser({
                username,
                email,
                role
            })

            const token = getToken()

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            navigate("/");

        } catch (error) {
            console.log(error)
        }

    }

    async function signUp({ username, email, password }: SignUpCredentials) {

        try {
            const response = await register(username, email, password);
            console.log(response)

            if (!!response) {
                toast({
                    title: 'Conta criada',
                    description: "Agora você pode começar a usar Teste do Sofá",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}