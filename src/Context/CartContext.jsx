import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utilities/constant";

export const CartContext = createContext()

export default function CartContextProvider(props) {
    const [cartCount, setCartCount] = useState(0)

    function getUserCart() {
        const headers = {
            token: localStorage.getItem("userToken")
        }
        return axios.get(BASE_URL + '/api/v1/cart', { headers }).then(response => {
            setCartCount(response.data.data.products.length)
            return response.data.data
        }).catch(error => {
            toast.error(error.message)
            throw error
        })
    }

    function addProductToUserCart(productId) {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.post(BASE_URL + '/api/v1/cart', { productId }, { headers }).then(response => {
            setCartCount(response.data.data.products.length)
            return response.data
        }).catch(error => {
            toast.error(error.message)
            throw error
        })
    }

    function deleteProductFromUserCart(productId) {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.delete(BASE_URL + '/api/v1/cart/' + productId, { headers }).then(response => {
            setCartCount(response.data.data.products.length)
            return response.data
        }).catch(error => {
            toast.error(error.message)
            throw error
        })
    }

    function updateCartItemQuantity(productId, count) {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.put(BASE_URL + '/api/v1/cart/' + productId, { count }, { headers }).then(response => response.data).catch(error => {
            toast.error(error.message)
            throw error
        })
    }

    function clearUserCart() {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.delete(BASE_URL + '/api/v1/cart', { headers }).then(response => {
            setCartCount(0)
            return response.data
        }).catch(error => {
            toast.error(error.message)
            throw error
        })
    }



    function checkout(cartId, redirectUrl, shippingAddress) {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.post(BASE_URL + `/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`, { shippingAddress }, { headers }).then(response => {
            setCartCount(0)
            return response.data
        }).catch(error => {
            toast.error(error.message)
            throw error
        })
    }


    useEffect(() => {
        getUserCart()
    }, [cartCount])




    return <CartContext.Provider value={{
        getUserCart,
        addProductToUserCart,
        deleteProductFromUserCart,
        updateCartItemQuantity,
        clearUserCart,
        cartCount,
        checkout
    }}>
        {props.children}
    </CartContext.Provider>
}