import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    Button as ChakraButton,
    useDisclosure,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import CreateUserModalForm from '../components/Form/User/CreateUserModalForm'
import EditUserModalForm from '../components/Form/User/EditUserModalForm'
import Navbar from '../components/Navbar'
import { UserStateContext } from '../contexts/UserStateContext'
import api from '../services/api'

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}

export default function Inspectors() {

    const [users, setUsers] = useState<User[]>([])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

    const { setUserState, userState } = useContext(UserStateContext)

    async function getUsers() {

        try {
            const response = await api.get('/users/get/all')

            setUsers(response.data.users)
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getUsers()
    }, [])

    async function handleDelete(id: string) {

        api.delete(`/users/${id}`)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        setUserState(!userState);
    }

    if (!users) {
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

            <ChakraButton m='20px' bg='primary' color='white' mr={1} onClick={onCreateOpen}>Criar novo usuário</ChakraButton>
            <CreateUserModalForm isSelfOpen={isCreateOpen} onSelfClose={onCreateClose} />

            <Table variant='simple'>
                <TableCaption>Lista de inspetores do sistema</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>email</Th>
                        <Th>role</Th>
                        <Th>Ação</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user._id}>
                            <Td>{user.username}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <ChakraButton bg='info' color='white' mr={1} onClick={onOpen}>Editar</ChakraButton>
                                <EditUserModalForm isSelfOpen={isOpen} onSelfClose={onClose} name={user.username} userId={user._id} />
                                <ChakraButton bg='danger' color='white' onClick={() => handleDelete(user._id)}>Excluir</ChakraButton>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )

}