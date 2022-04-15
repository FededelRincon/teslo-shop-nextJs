import { useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { AuthLayout } from '../../components/layouts'
import { tesloApi } from '../../api';
import { validations } from '../../utils';



type FormData = {
    name    : string;
    email   : string;
    password: string;
};

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState( false );


    const onRegisterForm = async ( { email, password, name }: FormData) => {

        setShowError(false);

        try {
            const { data } = await tesloApi.post('/user/register', { email, password, name })
            const { token, user } = data;

            console.log({ token, user })

        } catch (error) {
            console.log('Error en las credenciales')
            
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);

            //TODO: navegar a la pantalla previa a hacer el login
        }


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
                            <NextLink href='/auth/login' passHref>
                                <Link underline='always' >
                                    ¿ Ya tienes cuenta ?
                                </Link>
                            </NextLink>
                        </Grid>


                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage