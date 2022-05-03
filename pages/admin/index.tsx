import React from 'react'
import { AccessTimeOutlined, CancelPresentationOutlined, CategoryOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'

import { AdminLayout } from '../../components/layouts'
import { Grid } from '@mui/material'
import { SummaryTile } from '../../components/admin'


const DashboardPage = () => {
    return (
        <AdminLayout
            title="Dashboard"
            subTitle="Estadisticas generales"
            icon={ <DashboardOutlined /> }
        >
            <Grid container spacing={2}>
                
                <SummaryTile 
                    title={ 4 } 
                    subTitle={ 'Clientes' } 
                    icon={ <GroupOutlined color="success" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ 5 } 
                    subTitle={ 'Productos' } 
                    icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ 6 } 
                    subTitle={ 'Sin existencias' } 
                    icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ 7 } 
                    subTitle={ 'Bajo inventario' } 
                    icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ 8 } 
                    subTitle={ 'Actualizacion en:' } 
                    icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> } 
                />

            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage