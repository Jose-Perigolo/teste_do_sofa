import { Flex, Button, ButtonGroup } from '@chakra-ui/react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { logout } from '../services/auth.service'

export default function Navbar() {

    const { user } = useContext(AuthContext)

    return (
        <Flex py='8px' my='60px' w='100%' justify='space-between'>
            <Flex fontWeight='400'>
                <ButtonGroup variant='link' spacing='6'>
                    <NavLink to='/'>
                        <Button fontWeight='400'>Home</Button>
                    </NavLink>
                    <NavLink to='/sofas'>
                        <Button fontWeight='400'>Sofas</Button>
                    </NavLink>
                    <NavLink to='/reports'>
                        <Button fontWeight='400'>Laudos</Button>
                    </NavLink>
                    {user?.role === 'admin' &&
                        <NavLink to='/inspectors'>
                            <Button fontWeight='400'>Inspetores</Button>
                        </NavLink>
                    }
                </ButtonGroup>
            </Flex>
            <Flex>
                <NavLink to='/login'>
                    <Button variant='link' onClick={() => logout()} >Sair</Button>
                </NavLink>
            </Flex>
        </Flex>
    )
}