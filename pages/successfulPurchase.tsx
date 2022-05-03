import NextLink from 'next/link';
import { Box, Link, Typography } from "@mui/material";
import { useRouter } from 'next/router';

import { ShopLayout } from "../components/layouts"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context';


const SuccessfullPurchase = () => {

    const { isLoggedIn } = useContext( AuthContext );
    const router = useRouter();

    // si no esta logeado q lo saque de esta pagina
    useEffect(() => {
        if(!isLoggedIn) {
            router.push('/');
        }
    }, [])

    // que directamente no renderize nada de nada
    if( !isLoggedIn ){
        return (
            <>
            </>
        )

    }
    
    return (
        <ShopLayout title="successful purchase" pageDescription="Compra exitosa">
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(90vh - 200px)'
                sx={{ flexDirection:{ xs: 'column', sm: 'row' } }}
            >
                <Typography variant='h2' component='h2' fontSize={35} fontWeight={150} >Chequée su email para mas informacion. La compra ha sido completada exitosamente. Muchas gracias !</Typography>
            </Box>
            <Box
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
            >
                {/* TODO: Boton de regresar, en paginas pequeñas queda encima del 404 */}
                <NextLink href='/' passHref>
                    <Link typography='h4' color='secondary' >
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </ShopLayout>
    )
}

export default SuccessfullPurchase