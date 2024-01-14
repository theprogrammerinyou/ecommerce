import { createContext, useContext, useReducer, useEffect, } from "react"
import { ProductReducer } from '../reducers/product-reducer'
import axios from "axios"
const ProductContext = createContext()

const initState = {
    products: [],
    categories: []
}
const ProductProvider = ({ children }) => {

    const [productState, productDispatch] = useReducer(ProductReducer, initState)
    let endpoints = [
        "/api/products",
        "/api/categories",
    ];
    useEffect(() => {
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            axios.spread((...allData) => {
                const [products, categories] = allData
                productDispatch({
                    type: "SET_PRODUCTS",
                    payload: products.data.products
                })
                productDispatch({
                    type: "SET_CATEGORIES",
                    payload: categories.data.categories
                })
            })
        );
    }, [])
    return (
        <ProductContext.Provider value={productState}>
            {children}
        </ProductContext.Provider>
    )
}
const useProducts = () => useContext(ProductContext);

export { useProducts, ProductProvider }