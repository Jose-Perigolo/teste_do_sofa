import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        success: "#5CB85C",
        green: {
            400: "#34CB79",
            600: "#2FB86E"
        },
        gray: {
            100: "#F0F0F5",
            400: "#B9B9B9",
            500: "#A8A3A3"
        },
        primary: "#0275D8",
        info: "#5BC0DE",
        danger: "#D9534F",
        title: "#322153",
        text: "#6C6C80"
    },
    fonts: {
        heading: 'Ubuntu, sans-serif',
        body: 'Roboto, sans-serif',
    },
    // components: {
    //     Text: {
    //         sizes: {

    //         }
    //     }
    // },
    styles: {
        global: {
            body: {
                bg: '#F0F0F5',
                color: '#6C6C80',
            },
        },
    },
});
