import { useContext } from 'react';
import useSWR from 'swr'
import { AccountCircleOutlined, BadgeOutlined, GroupOutlined, ProductionQuantityLimitsOutlined, SellOutlined } from '@mui/icons-material'

import { AdminLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { AuthContext } from '../../context';


const DashboardPage = () => {

    const { user } = useContext(AuthContext)

    // swr haber si puedo usar condiciones de busqueda y mandar el mail por aca desde el context
    const { data, error } = useSWR<any>('/api/admin/perfil')


    
    if( !error && !data ) { //si no hay error pero tampoco esta la data disponible para mostrar 
        return (<></>)
    }
    
    if( error ){
        console.log(error)
        return <Typography>Error al cargar la informacion</Typography>
    }
    
    // filtro la busqueda, para el usuario en especifico
    const dataUser = data!.filter( u => u.email === user?.email )   ////no tengo idea como sacar este "error" de typescript...

    const { createdAt, email, name, role } = dataUser[0]

    return (
        <AdminLayout
            title="Perfil"
            subTitle="Informacion general"
            icon={ <AccountCircleOutlined /> }
        >
            <Grid container spacing={1}>
                
                <SummaryTile 
                    title={ email } 
                    subTitle={ 'Email' } 
                    icon={ <GroupOutlined color="success" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ name } 
                    subTitle={ 'Nombre' } 
                    icon={ <BadgeOutlined color="warning" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ role } 
                    subTitle={ 'Rol' } 
                    icon={ <SellOutlined color="error" sx={{ fontSize: 40 }} /> } 
                />

                <SummaryTile 
                    title={ new Date(createdAt).toLocaleString() } 
                    subTitle={ 'Fecha de creación' } 
                    icon={ <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} /> } 
                />

            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage