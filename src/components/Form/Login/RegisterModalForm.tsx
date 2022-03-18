import { Button as ChakraButton } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react'
import { FormEvent, useContext, useState } from "react";
import { Input } from "../../Input";
import { AuthContext } from "../../../contexts/AuthContext";

interface RegisterModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModalForm({ isOpen, onClose }: RegisterModalFormProps) {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp } = useContext(AuthContext)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signUp({ username, email, password })
  }

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar uma nova conta</ModalHeader>
        <form onSubmit={handleSubmit}>

          <ModalBody pb={6}>
            <Input id='username' type='username' label='Nome' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input autoComplete="on" id='email' type='email' label='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input autoComplete="on" id='password' type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <ChakraButton type='submit' bg='green.400' color='white' mr={3} onClick={onClose}>
              Salvar
            </ChakraButton>
            <ChakraButton type='button' bg='gray.400' color='white' onClick={onClose}>Cancelar</ChakraButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}