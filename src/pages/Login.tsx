import { Flex, Heading, Stack, Text, Box, Spacer } from "@chakra-ui/layout";
import { Image } from '@chakra-ui/react'
import LoginForm from "../components/Form/Login/LoginForm";

export default function Login() {

    return (
        <Flex
            as='main'
            p='71px'
            direction='row'
            h='calc(100% - 100px)'
            w='100%'
            maxWidth={1440}
            mx='auto'
        >
            <Flex direction='column' w="674px">
                <Box>
                    <Stack spacing={3} py='60px'>
                        <Heading fontSize='36px' color='title'>Teste do sofá</Heading>
                        <Heading fontSize='54px' color='title'>Garantindo o seu conforto</Heading>
                        <Text fontSize='24px'>Ajudamos pessoas a se sentirem confortáveis em seus momentos de lazer e descanso.</Text>
                    </Stack>
                </Box>
                <LoginForm />
            </Flex>
            <Spacer />
            <Box>
                <Image src='/sofa.png' alt='Dan Abramov' />
            </Box>
        </Flex>
    )
}