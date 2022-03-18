import { Box, Flex, FlexProps } from '@chakra-ui/react'
import EnterIcon from './EnterIcon'

interface ButtonProps extends FlexProps {
    bgicon: string;
    bg: string;
    children: string;
    type?: string;
}

interface IconBoxProps extends FlexProps {
    bg: string;
}

function IconBox({ bg, ...rest }: IconBoxProps) {
    return (
        <Flex bg={bg} w='72px' h='72px' borderLeftRadius='8px' justifyContent='center' alignItems='center' {...rest}>
            <EnterIcon />
        </Flex>
    )
}

export default function Button({ bg, bgicon, type, children, ...rest }: ButtonProps) {

    return (
        <Flex
            as='button'
            height='72px'
            type={type}
            lineHeight='1.2'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            justifyContent='flex-start'
            alignItems='center'
            borderRadius='8px'
            fontSize='14px'
            fontWeight='semibold'
            bg={bg}
            color='white'
            _hover={{ filter: 'brightness(0.90)' }}
            _active={{
                bg: '#dddfe2',
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
            }}
            _focus={{
                boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            {...rest}
        >
            <IconBox bg={bgicon} />
            <Box m='auto' >
                {children}
            </Box>
        </Flex >
    )
}

