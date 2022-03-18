import { Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SofaContainer from "../components/SofaContainer";
import { AuthContext } from "../contexts/AuthContext";
import totalReports from "../functions/totalReports";
import api from "../services/api";
import SofaProps from "../types/sofa"

export default function Reports() {

    const [sofas, setSofas] = useState<SofaProps[]>()

    const [rateCount, setRateCount] = useState(0)

    const { user } = useContext(AuthContext)

    async function getSofas() {
        try {
            const response = await api.get('/sofas')

            setSofas(response.data.sofas)

            const total = totalReports(response, user?.email)

            setRateCount(total)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSofas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

            <Flex mt='100px' mb='70px'>
                <Heading color='title'>Total de avaliações realizadas: {rateCount}</Heading>
            </Flex>
            <Flex direction='column'>
                <SofaContainer sofas={sofas} />
            </Flex>
        </Flex>
    )
}