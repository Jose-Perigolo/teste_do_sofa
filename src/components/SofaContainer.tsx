import { Flex, Heading, Image, Text, VStack, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { formatDateHour } from "../functions/formatDate";
import SofaProps from '../types/sofa'

interface SofaContainerProps {
    sofas: SofaProps[];
}

export default function SofaContainer({ sofas }: SofaContainerProps) {

    const { user } = useContext(AuthContext)

    return (
        <>
            {sofas.map(sofa => (
                <>
                    <Box width="100%" key={sofa._id}>

                        {sofa.updatedAt &&
                            <Text mr='60px' textAlign='right' fontSize='24px' fontWeight='bold'>{formatDateHour(sofa.updatedAt)}</Text>
                        }

                        <Flex mb='70px' bg='white' borderRadius='21px' py='18px' px='50px'>
                            <Flex direction='column' justify='center' align='center' mr='150px'>
                                <VStack spacing={4}>
                                    <Image width='210px' borderRadius='40%' src={sofa.imageUrl} alt={'Sofa em' + sofa.type} />
                                    <Heading fontSize='24px'>Avaliador: {user?.username} </Heading>
                                    <Flex justify='center' align='center' color='white'
                                        bg={sofa.posrates?.find(email => email === user?.email) ? 'success' : sofa.negrates?.find(email => email === user?.email) ? 'danger' : 'info'}
                                        w='127px' h='37px'>{sofa.posrates?.find(email => email === user?.email) ? 'Aprovado' : sofa.negrates?.find(email => email === user?.email) ? 'Reprovado' : 'Não Avaliado'}
                                    </Flex>
                                </VStack>
                            </Flex>
                            <Flex fontSize='24px' direction='column' align='flex-start' >
                                <Heading fontSize='24px' py='12px'>Sofá {sofa.seats} lugares em {sofa.type}</Heading>
                                <VStack spacing={1} px='25px' align='flex-start'>
                                    <Text>{sofa.seats} lugares</Text>
                                    <Text>{sofa.length}m de comprimento</Text>
                                    <Text>{sofa.width}m de largura</Text>
                                    <Text>{sofa.depth}m de profundidade</Text>
                                </VStack>
                            </Flex>
                        </Flex >
                    </Box>
                </>
            ))
            }
        </>
    )
}
