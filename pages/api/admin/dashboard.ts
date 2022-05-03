import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Product, User } from '../../../models';

type Data = {
    numberOfClients: number;         // role: client
    numberOfProducts: number;
    productsWithNoInventory: number; //0
    lowInventory: number;            // productos con 10 o menos
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect()

    // consultas individuales
    // const numberOfClients = await User.find({ role: 'client' }).count();
    // const numberOfProducts = await Product.count();
    // const productsWithNoInventory = await Product.find({ inStock: 0 }).count();
    // const lowInventory = await Product.find({ inStock: {$lte: 10} }).count();

    // consultas en paralelo
    const [ numberOfClients,numberOfProducts, productsWithNoInventory, lowInventory] = await Promise.all([
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: {$lte: 10} }).count(),
    ])


    await db.disconnect()

    res.status(200).json({
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    })

}