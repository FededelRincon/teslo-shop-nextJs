import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts'
import { tesloApi } from '../../api';
import { validations } from '../../utils';



type FormData = {
    name    : string;
    email   : string;
    password: string;
};

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState('');


    const onRegisterForm = async ( { name, email, password }: FormData) => {

        setShowError(false);

        const { hasError, message } = await registerUser( name, email, password );

        if( hasError ) {
            setShowError(true);
            setErrorMessage( message || '' )
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
            <form onSubmit={ handleSubmit(onRegisterForm) } noValidate >
                <Box sx={{ width: 350, padding:'10px 20px'}}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Crear Cuenta</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutlineOutlinedIcon /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        {/* Nombre completo */}
                        <Grid item xs={12}>
                            <TextField 
                                label="Nombre completo" 
                                variant="filled" 
                                fullWidth 
                                autoComplete='off'
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Minimo de 2 caracteres'}
                                })}
                                error = { !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>

                        {/* correo */}
                        <Grid item xs={12}>
                            <TextField 
                                type="email"
                                label="Correo" 
                                variant="filled" 
                                fullWidth 
                                { ...register('email',{
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

                        {/* Boton Registrar */}
                        <Grid item xs={12}>
                            <Button 
                                type="submit"
                                color="secondary" 
                                className="circular-btn" 
                                size='large' 
                                fullWidth
                            >
                                Registrar
                            </Button>
                        </Grid>

                        {/* no tenes cuenta? */}
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={ router.query.p ? `/auth/login?p=${ router.query.p }` : 'auth/login' }
                                passHref>
                                <Link underline='always' >
                                    ¿ Ya tienes cuenta ?
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
                <Box sx={{ opacity: '0.5', marginTop: '20px', marginLeft: '8px', padding:'15px 20px 15px 20px', backgroundColor: '#8B0000', color: '#B5B2B2', position: 'absolute', borderRadius: '25px' }} >
                    <Typography variant='h5' component="h5">Pereza de crear una cuenta?</Typography>
                    <Typography variant='h6' component="h6">Ya hice una para pruebas</Typography>
                    <Typography variant='h6' component="h6">Click en "ya tienes cuenta"</Typography>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage