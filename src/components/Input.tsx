import { Box, Text, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
    type: string;
    label: string
}

export function Input({ type, label, ...rest }: InputProps) {
    return (
        <Box>
            <Text size='14px'>{label}</Text>
            <ChakraInput bg='white' w='400px' h='56px' type={type} label={label} {...rest} />
        </Box>
    )
}