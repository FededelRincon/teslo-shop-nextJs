import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { AccessTimeOutlined, CancelPresentationOutlined, CategoryOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'

import { AdminLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces'


const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 60 * 1000    //1 min
    })

    const [refreshIn, setRefreshIn] = useState(60)

    useEffect(() => {
        const interval = setInterval( () => {
            setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn -1 : 60)
        }, 1000);
    
        return () => clearInterval( interval )
    }, [])
    

    if( !error && !data ) { //si no hay error pero tampoco esta la data disponible para mostrar 
        return (<></>)
    }

    if( error ){
        console.log(error)
        return <Typography>Error al cargar la informacion</Typography>
    }

    const { numberOfClients, numberOfProducts, productsWithNoInventory, lowInventory} = data!;

    return (
        <AdminLayout
            title="Dashboard"
            subTitle="Estadisticas generales"
            icon={ <DashboardOutlined /> }
        >
            <Grid container spacing={2}>
                
                <SummaryTile 
                    title={ numberOfClients } 
                    subTitle={ 'Clientes' } 
                    icon={ <GroupOutlined color="success" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ numberOfProducts } 
                    subTitle={ 'Productos' } 
                    icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ productsWithNoInventory } 
                    subTitle={ 'Sin existencias' } 
                    icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ lowInventory } 
                    subTitle={ 'Bajo inventario' } 
                    icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ `${refreshIn} Segundos` } 
                    subTitle={ 'Actualizacion en:' } 
                    icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> } 
                />

            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage