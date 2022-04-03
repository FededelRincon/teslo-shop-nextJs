import NextLink from 'next/link';
import { Box, Link, Typography } from "@mui/material";

import { ShopLayout } from "../components/layouts"


const Custom404Page = () => {
    return (
        <ShopLayout title="Page not found" pageDescription="Pagina no encontrada">
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(90vh - 200px)'
                sx={{ flexDirection:{ xs: 'column', sm: 'row' } }}
                // sx={{ flexDirection:{ xs: 'column', sm: 'row', backgroundColor:'grey' } }}
            >
                <Typography variant='h1' component='h1' fontSize={75} fontWeight={200} >404 |</Typography>
                <Typography marginLeft={2}>La pagina solicitada no existe. </Typography>
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

export default Custom404Page