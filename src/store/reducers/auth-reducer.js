export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        case "ADD_ADDRESS":
            return { ...state, addresses: action.payload }
        case "ADD_ORDERS":
            return { ...state, orders: action.payload }
        case "REMOVE_USER":
            localStorage.removeItem("felix-store-user-token")
            return {
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
        default:
            return state
    }
}