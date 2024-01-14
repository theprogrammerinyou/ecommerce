import { createContext, useContext, useReducer, useEffect, useState } from "react"
import { AuthReducer } from "../reducers/auth-reducer"
import axios from "axios"
import { useBasket } from "./basket-provider"
import { useWishlist } from "./wishlist-provider"
import { useToast } from 'react-felix-ui'
import { useNavigate } from "react-router-dom"
import loader from "@assets/images/loading.gif"
const AuthContext = createContext()

const initialState = {
    _id: "",
    name: "",
    email: "",
    createdAt: "",
    gender: "",
    location: "",
    mobileNum: "",
    addresses: [],
    orders: [],
    updatedAt: "",
    encodedToken: ""
}
const AuthProvider = ({ children }) => {
    const [UserState, AuthDispatcher] = useReducer(AuthReducer, initialState)
    const { BasketDispatcher } = useBasket()
    const { setWishlistState } = useWishlist()
    const toast = useToast()
    const [load, setLoad] = useState(false)

    const navigate = useNavigate()

    const addNewAddress = async (address) => {
        const token = localStorage.getItem("felix-store-user-token")
        await axios.post("/api/user/address",
            {
                address,
            },
            {
                headers: {
                    authorization: token,
                },
            }
        ).then(response => {
            AuthDispatcher({
                type: "ADD_ADDRESS",
                payload: response.data.addresses,
            });
            toast({
                status: "success",
                message: "New address added",
                duration: 2
            })
        }).catch(err => {
            toast({
                status: "error",
                message: "Sign in to your account first",
                duration: 2
            })
            navigate('/signin')
        })
    };

    const deleteAddress = async (addressId) => {
        const token = localStorage.getItem("felix-store-user-token")
        await axios.delete(`/api/user/address/${addressId}`,
            {
                headers: {
                    authorization: token,
                },
            }
        ).then(response => {
            AuthDispatcher({
                type: "ADD_ADDRESS",
                payload: response.data.addresses,
            });
            toast({
                status: "success",
                message: "Address deleted",
                duration: 2
            })
        }).catch(err => {
            toast({
                status: "error",
                message: "Sign in to your account first",
                duration: 2
            })
            // navigate('/signin')
        })
    };

    const updateAddress = async (address) => {
        const token = localStorage.getItem("felix-store-user-token")
        await axios.post(`/api/user/address/${address._id}`,
            {
                address,
            },
            {
                headers: {
                    authorization: token,
                },
            }
        ).then(response => {
            AuthDispatcher({
                type: "ADD_ADDRESS",
                payload: response.data.addresses,
            });
            toast({
                status: "success",
                message: "Address Updated",
                duration: 2
            })
        }).catch(err => {
            toast({
                status: "error",
                message: "Sign in to your account first",
                duration: 2
            })
            // navigate('/signin')
        })
    };

    const placeOrder = async (order) => {
        const token = localStorage.getItem("felix-store-user-token")
        await axios.post("/api/user/place-order",
            {
                order,
            },
            {
                headers: {
                    authorization: token,
                },
            }
        ).then(response => {
            AuthDispatcher({
                type: "ADD_ORDERS",
                payload: response.data.orders,
            });
        }).catch(err => {
            toast({
                status: "error",
                message: "Sign in to your account first",
                duration: 2
            })
            navigate('/signin')
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("felix-store-user-token")
        if (token) {
            axios.post("/api/auth/verify", {
                encodedToken: token
            }).then((response) => {
                const user = response.data
                const temp = { ...user, name: user.fullName, encodedToken: token }
                delete temp.cart
                delete temp.wishlist
                AuthDispatcher({
                    type: "SET_USER",
                    payload: temp
                })
                BasketDispatcher({
                    type: "SET_ITEMS",
                    payload: user.cart
                })
                setWishlistState(user.wishlist)
                setLoad(true)
            }).catch((err) => {
                AuthDispatcher({
                    type: "REMOVE_USER"
                })
                setLoad(true)
            })
        }
        else {
            setLoad(true)
        }
    }, [])
    return (
        <AuthContext.Provider value={{ UserState, AuthDispatcher, addNewAddress, deleteAddress, updateAddress, placeOrder }}>
            {
                load ?
                    children
                    : <div className="loading">
                        <img src={loader} alt="" />
                    </div>
            }
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }