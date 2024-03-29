import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';


type FormData = {
    email: string,
    password: string,
};


const LoginPage = () => {

    const router = useRouter();
    const { loginUser } = useContext( AuthContext );
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState( false );

    const onLoginUser = async ( { email, password }: FormData) => {

        setShowError(false);

        const isValidLogin = await loginUser( email, password);

        if( !isValidLogin ){
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        const destination = router.query.p?.toString() || '/'
        router.replace( destination );
    }

    return (
        <AuthLayout title='Ingresar' >
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
                <Box sx={{ width: 350, padding:'10px 20px'}}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesion</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutlineOutlinedIcon /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        {/* correo */}
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete='off'
                                type="email"
                                label="Correo" 
                                variant="filled" 
                                fullWidth
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error = { !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>

                        {/* Contraseña */}
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete='off'
                                label="Contraseña" 
                                type="password" 
                                variant="filled" 
                                fullWidth 
                                { ...register('password',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo de 6 caracteres'}
                                })}
                                error = { !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        {/* Boton login */}
                        <Grid item xs={12}>
                            <Button 
                                type="submit"
                                color="secondary" 
                                className="circular-btn" 
                                size='large' 
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        {/* no tenes cuenta? */}
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={ router.query.p ? `/auth/register?p=${ router.query.p }` : 'auth/register' } passHref>
                                <Link underline='always' >
                                    ¿ No tienes cuenta ?
                                </Link>
                            </NextLink>
                        </Grid>

                        {/* Volver al inicio */}
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={ '/' } passHref>
                                <Link underline='always' >
                                    Volver a Inicio
                                </Link>
                            </NextLink>
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{ opacity: '0.5', marginTop: '20px', marginLeft: '35px', padding:'15px 20px 15px 20px', backgroundColor: '#8B0000', color: '#B5B2B2', position: 'absolute', borderRadius: '25px' }} >
                    <Typography variant='h5' component="h5">Valores para ingresar:</Typography>
                    <Typography variant='h6' component="h6">fede@gmail.com</Typography>
                    <Typography variant='h6' component="h6">123456</Typography>
                    <Typography variant='h6' component="h6">de nada! ;)</Typography>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage