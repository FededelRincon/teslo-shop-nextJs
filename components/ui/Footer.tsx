import { Box, Typography } from '@mui/material';


export const Footer = () => {
    return (
        <Box
            sx={{ backgroundColor: 'lightgray', borderTop: '2px solid black', padding: 2.5, display: 'flex', justifyContent: 'space-between' }}
        >
            <Box>
                <Typography variant='body2'>Copyright © 2003-2022 - Teslo S.R.L.</Typography>
                <Typography variant='body2'>Beverly Hills Av. CP 90210, LA, California</Typography>
            </Box>

            <Typography variant='body2'>Sitio creado por FDR. Todos los derechos reservados.</Typography>
        </Box>
    )
}
