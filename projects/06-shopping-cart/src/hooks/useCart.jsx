import { useContext } from "react";
import { CartContext } from "../contexts/cart.jsx";

export const useCart = () => {
    const cart = useContext(CartContext)

    if (cart === undefined) {
        throw new Error('useCart must be used within CartProvider')
    }

    return [cart]
}