import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';

import { useProducts } from '../../hooks';




const Women: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=women');


    return (
        <>
            <ShopLayout title={'Teslo-Shop - Women page'} pageDescription={'Teslo - Ropa Mujeres'} >
                <Typography variant='h1' component='h1'>Mujeres</Typography>
                <Typography variant='h2' sx={{ mb: 1 }}>Productos para ellas</Typography>

                {
                    isLoading
                        ? <FullScreenLoading />
                        : (
                            <ProductList 
                                products={ products } 
                            />
                        )
                }

            </ShopLayout>
        </>
    )
}

export default Women;
