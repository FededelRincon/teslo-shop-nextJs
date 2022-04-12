import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "../../context";
import { currency } from "../../utils";



export const OrderSummary = () => {

    const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

    return (
        <Grid container>
            
            {/* 1er linea */}
            <Grid item xs={6}>
                <Typography>N° Productos</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto' }</Typography>
            </Grid>

            {/* 2da linea */}
            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ currency.format(subTotal) }</Typography>
            </Grid>

            {/* 3er linea */}
            <Grid item xs={6}>
                <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 } %) </Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ currency.format(tax) }</Typography>
            </Grid>

            {/* 4ta linea */}
            <Grid item xs={6} sx={{ mt:2 }} >
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt:2 }} >
                <Typography variant="subtitle1">{ currency.format(total) }</Typography>
            </Grid>

        </Grid>
    )
}
