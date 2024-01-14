import { useState } from "react"
import { useAuth } from "@providers/auth-provider"
import { useBasket } from "@providers/basket-provider"
import { useWishlist } from "@providers/wishlist-provider"
export const useInputHandler = (state) => {
    const [inputState, setInputState] = useState(state)
    const inputChange = (evt) => {
        const type = evt.target.type;
        const value = evt.target.value;
        const name = evt.target.name
        switch (type) {

            case 'checkbox':
                if (value !== "on") {
                    setInputState({
                        ...inputState,
                        [name]: value
                    });
                } else {

                    setInputState({
                        ...inputState,
                        [name]: evt.target.checked
                    });
                }
                break
            default:
                setInputState({
                    ...inputState,
                    [name]: value
                });
                break
        }


    }
    return { inputState, inputChange, setInputState }
}

export const useSetUserDetails = () => {
    const { AuthDispatcher } = useAuth()
    const { BasketDispatcher } = useBasket()
    const { setWishlistState } = useWishlist()

    return (user, token) => {
        AuthDispatcher({
            type: "SET_USER",
            payload: {
                _id: user._id,
                name: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                encodedToken: token
            }
        })
        BasketDispatcher({
            type: "SET_ITEMS",
            payload: user.cart
        })
        setWishlistState(user.wishlist)
    }
}