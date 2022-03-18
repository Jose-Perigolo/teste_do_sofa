import { Flex, Heading, Spacer } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import RegisterSofaModalForm from "../components/Form/Sofa/RegisterSofaModalForm";
import Navbar from "../components/Navbar";
import SofaContainer from "../components/SofaContainer";
import { AuthContext } from "../contexts/AuthContext";
import totalReports from "../functions/totalReports";
import api from "../services/api";
import SofaProps from "../types/sofa";

export default function Home() {

    const { user } = useContext(AuthContext)

    const [rateCount, setRateCount] = useState<any>(null)
    const [sofaCount, setSofaCount] = useState<any>(null)
    const [sofa, setSofa] = useState<SofaProps | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()

    async function getSofas() {
        try {
            const response = await api.get('/sofas')

            const totalSofas = response.data.sofas.length
            const totalRated = totalReports(response, user?.email)

            setRateCount(totalRated)
            setSofaCount(totalSofas)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function getLastSofa() {
        try {
            const response = await api.get('/sofas/last')
            setSofa(response.data.sofa)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSofas()
        getLastSofa()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <Flex mx='40px' direction='column' color='title' fontSize='24px'>
                <Heading fontSize='24px'>Total de avaliações realizadas : {rateCount}</Heading>
                <Spacer py='20px' />
                <Heading fontSize='24px'>Sofas cadastrados : {sofaCount}</Heading>
            </Flex>
            <Flex my='45px' justifyContent='space-between' alignItems='flex-end'>
                <Heading color='title'>Última avaliação:</Heading>
                <Flex direction='column'>
                    {user?.role === 'admin' &&
                        <Button w='243px' bg='gray.400' bgicon='gray.500' onClick={onOpen}>Cadastrar sofá</Button>
                    }
                </Flex>
            </Flex>
            {sofa && <SofaContainer sofas={[sofa]} />}
            <RegisterSofaModalForm isSelfOpen={isOpen} onSelfClose={onClose} />
        </Flex>
    )
}
