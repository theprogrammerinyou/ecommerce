import { productCountByCategory } from "./reducer-functions"
export const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload }
        case "SET_CATEGORIES":
            return { ...state, categories: productCountByCategory(state.products, action.payload) }
        default:
            return state
    }

}   