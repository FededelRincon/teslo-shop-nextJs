import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { CartContext } from '../../context';
import { ShopLayout } from "../../components/layouts"
import { CartList, OrderSummary } from "../../components/cart";
import { countries } from '../../utils';


type FormData = {
    name: string,
    card: number,
    exp: number,
    cvv: number,
};

const SummaryPage = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [cardNumber, setCardNumber] = useState(0);
    const [showForm, setShowForm] = useState(false)
    const [open, setOpen] = useState(false)

    const { shippingAddress, numberOfItems, total, clearCart } = useContext(CartContext);
    if(!shippingAddress) {
        return <></>
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;


    const onPayCart = async ( data: FormData) => {
        setCardNumber(data.card)
        handleClickOpen();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClosePositive = () => {
        setOpen(false);
        clearCart();
        router.push('/successfulPurchase');
        // console.log('sujeto SI quiere abonar');
    };
    
    const handleCloseNegative = () => {
        setOpen(false);
        // console.log('sujeto NO quiere abonar');
    };
    

    return (
        <ShopLayout title='Resumen de orden' pageDescription={"Resumen de la orden"}>
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={ 12 } sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={ 12 } sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2' >Resumen ({numberOfItems} { numberOfItems === 1 ? 'Producto' : 'Productos' })</Typography>
                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{ firstName } { lastName }</Typography>
                            <Typography>{ address }{ address2 ? `, ${address2}` : '' }</Typography>
                            <Typography>{ city }, { zip }</Typography>
                            <Typography>{ countries.find( c => c.code === country)?.name }</Typography>
                            <Typography>{ phone }</Typography>

                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='end' sx={{mb:1}}>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Divider sx={{my:1, mb:2}} />

                            {
                                showForm ? (
                                    <form onSubmit={ handleSubmit(onPayCart) } noValidate >

                                        {/* Name */}
                                        <Grid item xs={12}>
                                            <TextField 
                                                label="Nombre completo" 
                                                variant="filled" 
                                                fullWidth 
                                                autoComplete='off'
                                                { ...register('name', {
                                                    required: 'Este campo es requerido',
                                                    minLength: { value: 6, message: 'Minimo de 6 caracteres'},
                                                    maxLength: { value: 20, message: 'Maximo de 20 caracteres'},
                                                })}
                                                error = { !!errors.name }
                                                helperText={ errors.name?.message }
                                            />
                                        </Grid>
                                        
                                        {/* Card */}
                                        <Grid item xs={12}>
                                            <TextField 
                                                type="number"
                                                label="Numero Tarjeta" 
                                                variant="filled" 
                                                fullWidth 
                                                autoComplete='off'
                                                { ...register('card', {
                                                    required: 'Este campo es requerido',
                                                    minLength: { value: 16, message: 'Minimo de 16 caracteres'},
                                                })}
                                                error = { !!errors.card }
                                                helperText={ errors.card?.message }
                                            />
                                        </Grid>

                                        {/* exp */}
                                        <Grid item xs={12}>
                                            <TextField 
                                                type="number"
                                                label="Fecha Vencimiento" 
                                                variant="filled" 
                                                fullWidth 
                                                autoComplete='off'
                                                { ...register('exp', {
                                                    required: 'Este campo es requerido',
                                                    minLength: { value: 5, message: 'Minimo de 5 caracteres'},
                                                    maxLength: { value: 5, message: 'Maximo de 5 caracteres'},
                                                })}
                                                error = { !!errors.exp }
                                                helperText={ errors.exp?.message }
                                            />
                                        </Grid>

                                        {/* cvv */}
                                        <Grid item xs={12}>
                                            <TextField 
                                                type="number"
                                                label="Numero seguridad" 
                                                variant="filled" 
                                                fullWidth 
                                                autoComplete='off'
                                                { ...register('cvv', {
                                                    required: 'Este campo es requerido',
                                                    minLength: { value: 3, message: 'Minimo de 3 caracteres'},
                                                    maxLength: { value: 3, message: 'Maximo de 3 caracteres'},
                                                })}
                                                error = { !!errors.cvv }
                                                helperText={ errors.cvv?.message }
                                            />
                                        </Grid>

                                        <Box sx={{ mt:3 }}>
                                            <Button 
                                                color="secondary" 
                                                className="circular-btn" 
                                                fullWidth
                                                type="submit"
                                            >
                                                Pagar
                                            </Button>
                                        </Box>
                                    </form>

                                ) : (
                                    <Box sx={{ mt:3 }}>
                                        <Button 
                                            onClick={ () => setShowForm( !showForm ) }
                                            color="secondary" 
                                            className="circular-btn" 
                                            fullWidth
                                            type="submit"
                                        >
                                            Abonar orden
                                        </Button>
                                    </Box>
                                )
                            }

                            <div>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Open alert dialog
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleCloseNegative || handleClosePositive }
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                    {"¿Realmente desea abonar con esta tarjeta?"}
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        El monto total a pagar es ${total} y sera abonado con la tarjeta { cardNumber }
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseNegative}>No pagar</Button>
                                        <Button onClick={handleClosePositive} autoFocus>
                                            Pagar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage;