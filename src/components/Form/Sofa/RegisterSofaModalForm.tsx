import { Button as ChakraButton, Flex } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text
} from '@chakra-ui/react'
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { SofaStateContext } from "../../../contexts/SofaStateContext";
import api from "../../../services/api";
import { Input } from "../../Input";
import NumberInput from "../../NumberInput";

interface RegisterSofaModalFormProps {
    isSelfOpen: boolean;
    onSelfClose: () => void;
}

const initialState = {
    type: "",
    seats: "",
    length: "",
    width: "",
    depth: ""
};

export default function RegisterSofaModalForm({ isSelfOpen, onSelfClose }: RegisterSofaModalFormProps) {

    const [{ type, seats, length, width, depth }, setState] = useState(initialState)

    const clearState = () => {
        setState({ ...initialState });
    };

    const { setSofaState, sofaState } = useContext(SofaStateContext)

    const [imageUrl, setImageUrl] = useState<Blob | null>(null)
    const [loading, setLoading] = useState(false)
    const [localImageUrl, setLocalImageUrl] = useState<Blob | null>()

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (imageUrl) {
            await api.post('/sofas/create', {
                imageUrl,
                type,
                seats,
                length,
                width,
                depth
            })
                .then((response) => { console.log(response) })
                .catch((error) => { console.log(error) })
        }

        setImageUrl(null);
        setSofaState(!sofaState);
        setLocalImageUrl(null);
        clearState();

    }

    const handleSubmitImage = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)

        if (localImageUrl) {
            const formData = new FormData();
            console.log(localImageUrl);
            formData.append("image", localImageUrl);
            formData.append("key", process.env.REACT_APP_IMGBB_API_KEY as string);

            console.log(formData);

            try {
                const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })

                setImageUrl(response.data.data.url);
                setLoading(false)

            } catch (err: any) {
                if (err?.message === 'Cancelled image upload.') return;
            }
        }

    }

    console.log(imageUrl);

    return (
        <>
            <Modal
                isOpen={isSelfOpen}
                onClose={onSelfClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar um novo sofá</ModalHeader>
                    <form id="saveForm" onSubmit={handleSubmit} />
                    <form id="uploadForm" onSubmit={handleSubmitImage} />
                    <ModalBody pb={6}>
                        <Text size='14px'>Foto</Text>
                        <Flex>
                            <input id='image' accept="image/*" type='file' onChange={(e) => setLocalImageUrl(e.target.files![0])} />
                            <ChakraButton isLoading={loading} loadingText='Carregando' isDisabled={!!imageUrl} size='sm' form="uploadForm" type='submit' bg='info' color='white'>
                                Upload
                            </ChakraButton>
                        </Flex>
                        <Input id='type' type='text' label='Descrição' value={type} name='type' onChange={onChange} />
                        <NumberInput label='Assentos' value={seats} name={seats}
                            onChange={(e) => {
                                const obj = { target: { name: 'seats', value: e } }
                                return onChange(obj)
                            }}
                        />
                        <NumberInput label='Comprimento (m)' value={length} name={length}
                            onChange={(e) => {
                                const obj = { target: { name: 'length', value: e } }
                                return onChange(obj)
                            }} />
                        <NumberInput label='Largura (m)' value={width} name={width}
                            onChange={(e) => {
                                const obj = { target: { name: 'width', value: e } }
                                return onChange(obj)
                            }} />
                        <NumberInput label='Profundidade (m)' value={depth} name={depth}
                            onChange={(e) => {
                                const obj = { target: { name: 'depth', value: e } }
                                return onChange(obj)
                            }} />
                    </ModalBody>

                    <ModalFooter>
                        <ChakraButton isDisabled={!imageUrl} form="saveForm" type='submit' bg='green.400' color='white' mr={3} onClick={onSelfClose}>
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