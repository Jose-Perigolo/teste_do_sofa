import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button as ChakraButton,
} from '@chakra-ui/react'
import { FormEvent, useContext, useState } from "react";
import { UserStateContext } from '../../../contexts/UserStateContext';
import api from "../../../services/api";
import { Input } from "../../Input";

interface CreateUserModalFormProps {
    isSelfOpen: boolean;
    onSelfClose: () => void;
}

const initialState = {
    username: "",
    email: "",
    password: ""
};

export default function CreateUserModalForm({ isSelfOpen, onSelfClose }: CreateUserModalFormProps) {

    const [{ username, email, password }, setState] = useState(initialState)

    const { setUserState, userState } = useContext(UserStateContext)

    const clearState = () => {
        setState({ ...initialState });
    };

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await api.post('/users/register', {
            username,
            email,
            password
        })
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })

        clearState();
        setUserState(!userState)

    }

    return (
        <>
            <Modal
                isOpen={isSelfOpen}
                onClose={onSelfClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar novo Inspetor</ModalHeader>
                    <form id="saveForm" onSubmit={handleSubmit} />
                    <ModalBody pb={6}>
                        <Input id='username' type='text' label='Nome' value={username} name='username' onChange={onChange} />
                        <Input id='email' type='email' label='Email' value={email} name='email' onChange={onChange} />
                        <Input id='password' type='password' label='Password' value={password} name='password' onChange={onChange} />
                    </ModalBody>

                    <ModalFooter>
                        <ChakraButton form="saveForm" type='submit' bg='green.400' color='white' mr={3} onClick={onSelfClose}>
                            Salvar
                        </ChakraButton>
                        <ChakraButton type='button' bg='gray.400' color='white' onClick={onSelfClose}>
                            Cancelar
                        </ChakraButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}