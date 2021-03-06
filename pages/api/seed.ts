import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    if ( process.env.NODE_ENV === 'production' ) {
        return res.status(401).json({
            message: 'No tiene acceso a este servicio'
        })
    }
    
    await db.connect();
    //mientras la db esta conectada podemos hacer cualquier tipo de interaccion
    
    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );

    await Product.deleteMany();   // se purga la base de datos
    await Product.insertMany( seedDatabase.initialData.products ); //inserto la semilla  

    
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente, seed inserted into database' })
}