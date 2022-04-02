import NextLink from 'next/link';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';

import { ShopLayout } from "../../components/layouts"
import { CartList, OrderSummary } from "../../components/cart";


const OrderPage = () => {

    return (
        <ShopLayout title='Resumen de la orden 919591595747' pageDescription={"Resumen de la orden"}>
            <Typography variant='h1' component='h1'>Orden: ABC123</Typography>

            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color="error"
                icon={ <CreditCardOffOutlinedIcon/> }
            /> */}
            <Chip
                sx={{ my: 2 }}
                label='Orden ya fue pagada'
                variant='outlined'
                color="success"
                icon={ <CreditScoreOutlinedIcon/> }
            />

            <Grid container>
                <Grid item xs={ 12 } sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={ 12 } sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' >Resumen (3 productos)</Typography>
                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Fernando Herrera</Typography>
                            <Typography>323 Algun lugar</Typography>
                            <Typography>Stittsville, HYA 23s</Typography>
                            <Typography>Canada</Typography>
                            <Typography>+1 232323233</Typography>

                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='end' sx={{mb:1}}>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt:3 }}>
                                {/* TODO: */}
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label='Orden ya fue pagada'
                                    variant='outlined'
                                    color="success"
                                    icon={ <CreditScoreOutlinedIcon/> }
                                />
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default OrderPage;