import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Link, Toolbar, Typography, Box, Button, IconButton, Badge, Input, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { CartContext, UiContext } from '../../context';



export const Navbar = () => {

    const { push, asPath } = useRouter();
    const { toggleSideMenu } = useContext(UiContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        setSearchTerm('');

        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }

    
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

                <Box 
                    sx={{ display: isSearchVisible ? 'none' : { xs:'none', sm:'block' }  }} 
                    className="fadeIn"
                >
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

                

                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs:'none', sm:'flex' } }} 
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ ()=> setIsSearchVisible(false) }
                                        >
                                            <ClearOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton
                                onClick={ () => {setIsSearchVisible(true), setSearchTerm('')} }
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex'} }}
                            >
                                <SearchOutlinedIcon />
                            </IconButton>
                        )
                }

                {/* pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none'}}}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlinedIcon />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems> 9 ? '+9' : numberOfItems } color='secondary'> {/* son los numeritos arriba del carrito */}
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button
                    onClick={ toggleSideMenu }
                >
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
