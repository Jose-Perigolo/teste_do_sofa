import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Select,
    Button as ChakraButton,
} from '@chakra-ui/react'
import { FormEvent, useContext, useState } from "react";
import { SofaStateContext } from "../../../contexts/SofaStateContext";
import api from "../../../services/api";

interface RateSofaModalFormProps {
    sofaId: string;
    userEmail?: string;
    type: string;
    isSelfOpen: boolean;
    onSelfClose: () => void;
}

export default function RateSofaModalForm({ sofaId, userEmail, type, isSelfOpen, onSelfClose }: RateSofaModalFormProps) {

    const { setSofaState, sofaState } = useContext(SofaStateContext)

    const [report, setReport] = useState<string>()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await api.patch('/sofas/report', {
            _id: sofaId,
            report,
            email: userEmail
        })
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })

        setSofaState(!sofaState);

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
                    <ModalHeader>Editar sofá {type}</ModalHeader>
                    <form id="saveForm" onSubmit={handleSubmit} />
                    <ModalBody pb={6}>
                        <Select id='report' placeholder='Avaliação' name='report' value={report} onChange={(e) => setReport(e.target.value)}>
                            <option value='option1'>Aprovado</option>
                            <option value='option2'>Reprovado</option>
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