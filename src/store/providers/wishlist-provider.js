import { createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from 'react-felix-ui'
import { useState } from 'react'
import { checkWishListed } from "@global/js"
import axios from "axios"

const WishlistContext = createContext()

const WishlistProvider = ({ children }) => {
    const encodedToken = localStorage.getItem("felix-store-user-token");
    const [WishlistState, setWishlistState] = useState([])
    const toast = useToast()
    const navigate = useNavigate()
    const location = useLocation()

    const wishlistToggle = (item) => {
        const isWislisted = checkWishListed(WishlistState, item._id)
        if (isWislisted) {
            removeFromWishlist(item._id)
        }
        else {
            addToWishlist(item)
        }
    }

    const addToWishlist = (item) => {
        const checkPresence = WishlistState.filter((wItem => wItem._id === item._id))
        if (checkPresence.length === 0) {
            axios.post("/api/user/wishlist",
                { product: item },
                {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            ).then((response) => {

                setWishlistState(response.data.wishlist);
                toast({
                    status: "success",
                    message: "Item added in your wishlist",
                    duration: 2
                })
            }).catch((err) => {
                toast({
                    status: "error",
                    message: "Sign in to your account first",
                    duration: 2
                })
                navigate('/signin', { state: { from: location } })
            })
        } else {
            toast({
                status: "error",
                message: "Item is already in the wishlist",
                duration: 1.5
            })
        }
    };

    const removeFromWishlist = (id, alert) => {
        axios.delete(`/api/user/wishlist/${id}`, {
            headers: {
                authorization: encodedToken,
            },
        }).then((response) => {
            setWishlistState(response.data.wishlist);
            switch (alert) {
                case "no-alert":
                    break
                default:
                    toast({
                        status: "success",
                        message: "Item removed from your wishlist",
                        duration: 2
                    })
                    break
            }

        }).catch(err => {
            toast({
                status: "error",
                message: "Sign in to your account first",
                duration: 2
            })
            navigate('/signin', { state: { from: location } })
        })
    }
    return (
        <WishlistContext.Provider value={{ WishlistState, setWishlistState, wishlistToggle, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}
const useWishlist = () => useContext(WishlistContext)
export { useWishlist, WishlistProvider }