import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Select,
    Button as ChakraButton,
    Text
} from '@chakra-ui/react'
import { FormEvent, useState } from "react";
import api from "../../../services/api";
import { Input } from "../../Input";

interface EditUserModalFormProps {
    userId: string;
    name: string;
    isSelfOpen: boolean;
    onSelfClose: () => void;
}

const initialState = {
    username: "",
    email: "",
    role: ""
};

export default function EditUserModalForm({ userId, name, isSelfOpen, onSelfClose }: EditUserModalFormProps) {

    const [{ username, email, role }, setState] = useState(initialState)

    const clearState = () => {
        setState({ ...initialState });
    };

    const onChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value);
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await api.put('/users/update', {
            _id: userId,
            username,
            email,
            role
        })
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })

        clearState();

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
                    <ModalHeader>Editar {name}</ModalHeader>
                    <form id="saveForm" onSubmit={handleSubmit} />
                    <ModalBody pb={6}>
                        <Input id='username' type='text' label='Novo Nome' value={username} name='username' onChange={onChange} />
                        <Input id='email' type='email' label='Novo Email' value={email} name='email' onChange={onChange} />
                        <Text size='14px'>Nova função</Text>
                        <Select id='role' placeholder='Role' name='role' value={role} onChange={onChange}>
                            <option value='option1'>Inspetor</option>
                            <option value='option2'>Admin</option>
                        </Select>
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