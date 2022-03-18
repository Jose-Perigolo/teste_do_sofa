import {
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputProps as ChakraNumberInputProps,
    Text
} from '@chakra-ui/react'

interface NumberInputProps extends ChakraNumberInputProps {
    name: string;
    label: string
}

export default function NumberInput({ label, name, ...rest }: NumberInputProps) {

    return (
        <>
            <Text size='14px'>{label}</Text>
            <ChakraNumberInput
                min={0}
                name={name}
                {...rest}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </ChakraNumberInput>
        </>
    )
}