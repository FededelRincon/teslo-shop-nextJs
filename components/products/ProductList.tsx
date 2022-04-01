import { FC } from "react"
import { Grid } from "@mui/material"

import { IProduct } from "../../interfaces"
import { ProductCard } from "./ProductCard";


interface Props {
    products: IProduct[];
}

export const ProductList:FC<Props> = ({ products }) => {

    return (
        <Grid container spacing={4}>
            {
                products.map( product => (
                    <ProductCard 
                    // key={ product._id } //pero aun no lo tengo   
                        key={ product.slug }    
                        product={ product }                        
                    />
                ))
            }
        </Grid>

    )
}
