import { GetServerSideProps } from 'next';
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts";
import { jwt } from '../../utils';


const addressPage = () => {
    return (
        <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino">
            <Typography variant="h1" component="h1">Direccion</Typography>

            <Grid container spacing={ 2 } sx={{ mt: 2 }}>

                {/* nombre */}
                <Grid item xs={12} sm={6} >
                    <TextField label='nombre' variant="filled" fullWidth />
                </Grid>

                {/* apellido */}
                <Grid item xs={12} sm={6} >
                    <TextField label='apellido' variant="filled" fullWidth />
                </Grid>

                {/* direccion */}
                <Grid item xs={12} sm={6} >
                    <TextField label='direccion' variant="filled" fullWidth />
                </Grid>

                {/* direccion2 */}
                <Grid item xs={12} sm={6} >
                    <TextField label='direccion 2 (opcional)' variant="filled" fullWidth />
                </Grid>

                {/* Codigo Postal */}
                <Grid item xs={12} sm={6} >
                    <TextField label='Codigo Postal' variant="filled" fullWidth />
                </Grid>

                {/* Ciudad */}
                <Grid item xs={12} sm={6} >
                    <TextField label='Ciudad' variant="filled" fullWidth />
                </Grid>

                {/* Pais */}
                <Grid item xs={12} sm={6} >
                    <FormControl fullWidth>
                        <Select
                            variant="filled"
                            label="Pais"
                            value={0}
                        >
                            <MenuItem value={0}>-- Seleccione --</MenuItem>
                            <MenuItem value={1}>Costa Rica</MenuItem>
                            <MenuItem value={2}>Honduras</MenuItem>
                            <MenuItem value={3}>El Salvador</MenuItem>
                            <MenuItem value={4}>Mexico</MenuItem>
                            <MenuItem value={5}>Argentina</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Telefono */}
                <Grid item xs={12} sm={6} >
                    <TextField label='Telefono' variant="filled" fullWidth />
                </Grid>

            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                <Button color="secondary" className="circular-btn" size="large">
                    Revisar Pedido
                </Button>
            </Box>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken( token );
        isValidToken = true;

    } catch (error) {
        isValidToken = false;
    }

    if( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}


export default addressPage