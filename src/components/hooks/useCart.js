import React from 'react'
import {AppContext} from "../../App";

export const useCart = () => {
    const {setCartItems, cartItems} = React.useContext(AppContext)
    const getTotalPrice = () => cartItems.reduce((sum, obj) => obj.price + sum, 0)
    const getTotalTax = () => Math.floor(getTotalPrice(cartItems) * 0.05)

    return {getTotalPrice, setCartItems, cartItems, getTotalTax}
}