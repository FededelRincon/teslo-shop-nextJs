import NextLink from 'next/link';
import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge } from "@mui/material";
import { useRouter } from 'next/router';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export const Navbar = () => {

    const { asPath } = useRouter();
    
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref >
                    <Link display='flex' alignItems='center' >
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }} >Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: { xs:'none', sm:'block' }  }} >
                    <NextLink href='/category/men' passHref>
                        <Link>
                            <Button color={ (asPath === '/category/men') ? 'primary' : 'info' }>Hombres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/women' passHref>
                        <Link>
                            <Button color={ (asPath === '/category/women') ? 'primary' : 'info' } >Mujeres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' passHref>
                        <Link>
                            <Button color={ (asPath === '/category/kid') ? 'primary' : 'info' } >Niños</Button>
                        </Link>
                    </NextLink>
                </Box>


                <Box flex={1} />

                <IconButton>
                    <SearchOutlinedIcon />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'> {/* son los numeritos arriba del carrito */}
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button>
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
