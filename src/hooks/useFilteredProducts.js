import { useFilter } from '@providers/filter-provider'
import { productFilterByCategories, productFilterByPriceRange, sortProducts } from "./functions"

const useFilteredProducts = () => {
    const { FilterState, FilterDispatcher } = useFilter()

    const filterProducts = (productList, state) => {
        const init = {
            filter: "idle",
            sortBy: null,
            categories: [],
            priceLow: 1,
            priceHigh: 1000,
        }
        FilterDispatcher({ type: "FILTER_STATUS", payload: "processing" })
        const { categories, sortBy, priceLow, priceHigh } = state ? init : FilterState;

        if (sortBy) {
            productList = sortProducts(productList, sortBy);
        }
        if (categories.length > 0) {
            productList = productFilterByCategories(productList, categories);
        }
        if (priceLow !== 1 || priceHigh < 1000) {
            productList = productFilterByPriceRange(productList, priceLow, priceHigh)
        }
        FilterDispatcher({ type: "FILTER_STATUS", payload: "done" })

        return [...productList]
    }

    return filterProducts

}

export default useFilteredProducts