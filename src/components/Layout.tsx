import React, {PropsWithChildren} from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

 const Layout = ({children}: PropsWithChildren<{}>) => {

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#81C784",
                contrastText: '#000000',
            },
            secondary: {
                main: "#81C784",
                contrastText: '#000000',
            },

        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='container'>
                    {children}
                </div>
            </ThemeProvider>
        </>
    );
};

export default Layout;