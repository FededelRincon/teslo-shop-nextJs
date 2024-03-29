import { ICartProduct } from '../../interfaces';
import { CartState, ShippingAddress } from './';


type CartActionType = 
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change cart quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove product in cart', payload: ICartProduct }
    | { type: '[Cart] - LoadAddress from Cookies', payload: ShippingAddress }
    | { type: '[Cart] - Update Address', payload: ShippingAddress }
    | { 
        type: '[Cart] - Update order summary', 
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }
    | { type: '[Cart] - Clear Cart' }


export const cartReducer = ( state:CartState, action: CartActionType ): CartState => {

    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage' :
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }

        case '[Cart] - Update products in cart':
            return {
                ... state,
                cart: [ ...action.payload ]
            }

        case '[Cart] - Change cart quantity':
            return {
                ... state,
                cart: state.cart.map( product => {
                    if ( product._id !== action.payload._id) return product;
                    if ( product.size !== action.payload.size) return product;

                    // product.quantity = action.payload.quantity;
                    // return product;  //es lo mismo q abajo
                    return action.payload;
                })
            }

        case '[Cart] - Remove product in cart': 
            return {
                ...state,
                cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size)) 
                // cart: state.cart.filter( product => {
                //     if ( product._id === action.payload._id && product.size == action.payload.size) { //si el producto es igual en id, y en tamaño
                //         return false; //no devuelte el producto
                //     }
                //     return true; //si devuelve el producto
                // })
            }

        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        
        case '[Cart] - Update Address':
        case '[Cart] - LoadAddress from Cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }

        case '[Cart] - Clear Cart':
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0,
            }

        default:
            return state;
    }
}