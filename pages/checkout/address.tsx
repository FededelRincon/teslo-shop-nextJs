import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";
import { useContext } from "react";


type FormData = {
    firstName : string;
    lastName  : string;
    address   : string;
    address2? : string;
    zip       : string;
    city      : string;
    country   : string;
    phone     : string;
}


const getAddressFromCookies = ():FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName:  Cookies.get('lastName') || '',
        address:   Cookies.get('address') || '',
        address2:  Cookies.get('address2') || '',
        zip:       Cookies.get('zip') || '',
        city:      Cookies.get('city') || '',
        country:   Cookies.get('country') || '',
        phone:     Cookies.get('phone') || '',
    }

}

const addressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext( CartContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmitAddress = ( data: FormData ) => {
        updateAddress( data );
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
            <form
                onSubmit={ handleSubmit( onSubmitAddress ) }
            >
                <Typography variant="h1" component="h1">Direccion</Typography>

                <Grid container spacing={ 2 } sx={{ mt: 2 }}>

                    {/* nombre */}
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='nombre'
                            variant="filled"
                            fullWidth
                            { ...register('firstName',{
                                required: 'Este campo es requerido',
                            })}
                            error = { !!errors.firstName }
                            helperText={ errors.firstName?.message }
                        />
                    </Grid>

                    {/* apellido */}
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='apellido'
                            variant="filled"
                            fullWidth
                            { ...register('lastName',{
                                required: 'Este campo es requerido',
                            })}
                            error = { !!errors.lastName }
                            helperText={ errors.lastName?.message }
                        />
                    </Grid>

                    {/* direccion */}
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='direccion'
                            variant="filled"
                            fullWidth
                            { ...register('address',{
                                required: 'Este campo es requerido',
                            })}
                            error = { !!errors.address }
                            helperText={ errors.address?.message }
                        />
                    </Grid>

                    {/* direccion2 */}
                    <Grid item xs={12} sm={6} >
                        <TextField 
                            label='direccion 2 (opcional)' 
                            variant="filled" 
                            fullWidth 
                            { ...register('address2')}
                        />
                    </Grid>

                    {/* Codigo Postal */}
                    <Grid item xs={12} sm={6} >
                        <TextField 
                            label='Codigo Postal' 
                            variant="filled" 
                            fullWidth 
                            { ...register('zip',{
                                required: 'Este campo es requerido',
                            })}
                            error = { !!errors.zip }
                            helperText={ errors.zip?.message }
                        />
                    </Grid>

                    {/* Ciudad */}
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Ciudad'
                            variant="filled"
                            fullWidth
                            { ...register('city',{
                                required: 'Este campo es requerido',
                            })}
                            error = { !!errors.city }
                            helperText={ errors.city?.message }
                        />
                    </Grid>

                    {/* Pais */}
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                            <TextField
                                key={Cookies.get('country') || countries[0].code}
                                select
                                variant="filled"
                                label="Pais"
                                defaultValue={ Cookies.get('country') || countries[0].code }
                                { ...register('country',{
                                    required: 'Este campo es requerido',
                                })}
                                error = { !!errors.country }
                                // helperText={ errors.country?.message }
                            >
                                {/* <MenuItem value={0}>-- Seleccione una opcion --</MenuItem> */}
                                {
                                    countries.map( country => (
                                        
                                        <MenuItem 
                                            key={ country.code }
                                            value={ country.code}
                                        >
                                            { country.name }
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>

                    {/* Telefono */}
                    <Grid item xs={12} sm={6} >
                        <TextField
                            label='Telefono'
                            variant="filled"
                            fullWidth
                            { ...register('phone',{
                                required: 'Este campo es requerido',
                            })}
                            error = { !!errors.phone }
                            helperText={ errors.phone?.message }
                        />
                    </Grid>

                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Revisar Pedido
                    </Button>
                </Box>
            </form>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true;

//     } catch (error) {
//         isValidToken = false;
//     }

//     if( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }


export default addressPage