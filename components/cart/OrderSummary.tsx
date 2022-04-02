import { Divider, Grid, Typography } from "@mui/material"



export const OrderSummary = () => {
    return (
        <Grid container>
            
            {/* 1er linea */}
            <Grid item xs={6}>
                <Typography>N° Productos</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 items</Typography>
            </Grid>

            {/* 2da linea */}
            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$ {155.36}</Typography>
            </Grid>

            {/* 3er linea */}
            <Grid item xs={6}>
                <Typography>Impuestos (15%)</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$ {35.34}</Typography>
            </Grid>

            {/* 4ta linea */}
            <Grid item xs={6} sx={{ mt:2 }} >
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt:2 }} >
                <Typography variant="subtitle1">$ {186.34}</Typography>
            </Grid>

        </Grid>
    )
}
