import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = 
| { message: string }
| IUser[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // no pude hacer conseguir el mail del usuario en cuestion para filtrar la busqueda... asique dame todos y hago el filtro en la pagina
    
    await db.connect();
    const users = await User.find().select('-password').lean();

    await db.disconnect();

    return res.status(200).json( users );
}