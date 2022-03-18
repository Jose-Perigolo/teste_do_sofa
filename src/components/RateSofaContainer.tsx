import { Flex, Heading, Image, Button as ChakraButton, useDisclosure } from "@chakra-ui/react";
import Button from "./Button";
import SofaProps from '../types/sofa'
import { AuthContext } from "../contexts/AuthContext";
import { SofaStateContext } from "../contexts/SofaStateContext";
import { useContext } from "react";
import api from "../services/api";
import EditSofaModalForm from "./Form/Sofa/EditSofaModalForm";
import RateSofaModalForm from "./Form/Sofa/RateSofaModalForm";

interface RateContainerProps {
    sofas: SofaProps[];
}

export default function RateSofaContainer({ sofas }: RateContainerProps) {

    const { user } = useContext(AuthContext)
    const { setSofaState, sofaState } = useContext(SofaStateContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isOpen: isRateOpen, onOpen: onRateOpen, onClose: onRateClose } = useDisclosure()

    async function handleDelete(id: string) {

        api.delete(`/sofas/${id}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        setSofaState(!sofaState);
    }

    return (
        <>
            {sofas.map(sofa => (
                <Flex my='15px' w='100%' minHeight='134px' key={sofa._id} bg='white' borderRadius='21px' py='18px' px='50px' justify='space-between' align='center'>
                    <Image width='126px' borderRadius='40%' src={sofa.imageUrl} alt={'Sofa em' + sofa.type} mr='75px' />
                    <Heading mr='auto' ml='0' fontSize='24px'>{sofa.type}</Heading>
                    {user?.role === 'admin' ?
                        <>
                            <ChakraButton bg='info' color='white' mr={3} onClick={onOpen}>
                                Editar
                            </ChakraButton>
                            <ChakraButton bg='danger' color='white' onClick={() => handleDelete(sofa._id)}>
                                Deletar
                            </ChakraButton>
                        </>
                        :
                        (
                            sofa.posrates?.find(email => email === user?.email) ?
                                <Flex justify='center' align='center' color='white' bg='success' py='10px' px='30px' w='130px' h='35px'>Aprovado</Flex>
                                :
                                sofa.negrates?.find(email => email === user?.email) ?
                                    <Flex justify='center' align='center' color='white' bg='danger' py='10px' px='30px' w='130px' h='35px'>Reprovado</Flex>
                                    :
                                    <>
                                        <Button ml='15px' w='243px' bg='info' bgicon='primary' onClick={onRateOpen}>Avaliar</Button>
                                        <RateSofaModalForm type={sofa.type} sofaId={sofa._id} userEmail={user?.email} isSelfOpen={isRateOpen} onSelfClose={onRateClose} />
                                    </>
                        )
                    }
                    <EditSofaModalForm sofaId={sofa._id} sofaType={sofa.type} isSelfOpen={isOpen} onSelfClose={onClose} />
                </Flex >
            ))
            }
        </>
    )
}