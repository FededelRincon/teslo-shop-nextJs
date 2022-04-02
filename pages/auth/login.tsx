import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../../components/layouts'


const loginPage = () => {
    return (
        <AuthLayout title='Ingresar' >
            <Box sx={{ width: 350, padding:'10px 20px'}}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Iniciar Sesion</Typography>
                    </Grid>

                    {/* correo */}
                    <Grid item xs={12}>
                        <TextField label="Correo" variant="filled" fullWidth />
                    </Grid>

                    {/* Contraseña */}
                    <Grid item xs={12}>
                        <TextField label="Contraseña" type="password" variant="filled" fullWidth />
                    </Grid>

                    {/* Boton login */}
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    {/* no tenes cuenta? */}
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/register' passHref>
                            <Link underline='always' >
                                ¿ No tienes cuenta ?
                            </Link>
                        </NextLink>
                    </Grid>


                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default loginPage