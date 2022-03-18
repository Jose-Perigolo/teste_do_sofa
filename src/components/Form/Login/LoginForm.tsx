import { Box, Stack, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { FormEvent, useContext, useState } from "react";
import Button from '../../Button'
import { Input } from "../../Input";
import { AuthContext } from "../../../contexts/AuthContext";
import RegisterModalForm from "./RegisterModalForm";


export default function LoginForm() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await signIn({ email, password })
    }

    return (
        <Box display='flex' w='100%' flexDirection='column'>
            <Stack spacing={2}>
                <form onSubmit={handleSubmit}>
                    <Input autoComplete="on" id='email' type='email' label='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input autoComplete="on" id='password' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Flex py='30px' direction='row' w='400px'>
                        <Button type='submit' w='193px' bg='green.400' bgicon='green.600' color='white'>Entrar</Button>
                        <Spacer />
                        <Button type='button' onClick={onOpen} w='193px' bg='gray.400' bgicon='gray.500' color='white'>Nova Conta</Button>
                    </Flex>
                </form>
            </Stack>
            <RegisterModalForm isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}