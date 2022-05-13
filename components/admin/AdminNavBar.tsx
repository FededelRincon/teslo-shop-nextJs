import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, Link, Toolbar, Typography, Box, Button } from "@mui/material";

import {  UiContext } from '../../context';



export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UiContext);

    
    return (
        <AppBar
            sx={{ backgroundColor: 'lightgrey' }}
        >
            <Toolbar>
                <NextLink href='/' passHref >
                    <Link display='flex' alignItems='center' >
                        <Typography variant='h5'>Teslo |</Typography>
                        <Typography variant='h5' sx={{ ml: 0.5 }} >Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Button
                    onClick={ toggleSideMenu }
                >
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
