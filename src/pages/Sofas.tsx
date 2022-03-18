import { Flex, Heading, Button as ChakraButton, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import RegisterSofaModalForm from "../components/Form/Sofa/RegisterSofaModalForm";
import Navbar from "../components/Navbar";
import RateSofaContainer from "../components/RateSofaContainer";
import { AuthContext } from "../contexts/AuthContext";
import { SofaStateContext } from "../contexts/SofaStateContext";
import api from "../services/api";

export default function Sofas() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const flag = useContext(SofaStateContext)

    const [sofas, setSofas] = useState()
    const [sofasCount, setSofasCount] = useState(0)

    const { user } = useContext(AuthContext)

    async function getSofas() {
        try {
            const response = await api.get('/sofas')

            setSofas(response.data.sofas)
            setSofasCount(response.data.sofas.length)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSofas()
    }, [flag])


    if (!sofas) {
        return (
            <h1>Carregando...</h1>
        )
    }

    return (
        <Flex
            as='main'
            direction='column'
            h='calc(100% - 100px)'
            w='100%'
            maxWidth={1440}
            mx='auto'
            p='8px'
        >
            <Navbar />

            <Flex pt='100px' pb='36px' justify='space-between'>
                <Heading color='title'>Sofás cadastrados: {sofasCount}</Heading>
                {user?.role === 'admin' &&
                    <Button w='243px' bg='gray.400' bgicon='gray.500' mr='30px' onClick={onOpen}>Cadastrar sofá</Button>
                }
            </Flex>
            <Flex direction='column'>
                <RateSofaContainer sofas={sofas} />
            </Flex>
            <RegisterSofaModalForm isSelfOpen={isOpen} onSelfClose={onClose} />
        </Flex>
    )
}