import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utilities/constant";

export const WishListContext = createContext()

export default function WishListContextProvider(props) {
    function getUserWishList() {
        const headers = {
            token: localStorage.getItem("userToken")
        }
        return axios.get(BASE_URL + '/api/v1/wishlist', { headers }).then(response => response.data.data).catch(error => {
            toast.error(error.message)
            throw error
        })
    }


    function getUserWishListIds() {
        const headers = {
            token: localStorage.getItem("userToken")
        }
        return axios.get(BASE_URL + '/api/v1/wishlist', { headers }).then(response => response.data.data.map(product => product.id)).catch(error => {
            toast.error(error.message)
            throw error
        })
    }

    function addProductToUserWishList(productId) {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.post(BASE_URL + '/api/v1/wishlist', { productId }, { headers }).then(response => response.data).catch(error => {
            toast.error(error.message)
            throw error
        })
    }

    function deleteProductFromUserWishList(productId) {
        const headers = {
            token: localStorage.getItem("userToken")
        }

        return axios.delete(BASE_URL + '/api/v1/wishlist/' + productId, { headers }).then(response => response.data).catch(error => {
            toast.error(error.message)
            throw error
        })
    }


    return <WishListContext.Provider value={{
        getUserWishList,
        getUserWishListIds,
        addProductToUserWishList,
        deleteProductFromUserWishList,
    }}>
        {props.children}
    </WishListContext.Provider>
}