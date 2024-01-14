export const FilterReducer = (state, { type, payload }) => {
    switch (type) {
        case "FILTER_BY_SORT":
            return { ...state, sortBy: payload }
        case "FILTER_BY_CATEGORY":
            return { ...state, categories: payload }
        case "FILTER_BY_PRICE_RANGE":
            return { ...state, priceLow: payload.min, priceHigh: payload.max }
        case "FILTER_STATUS":
            return { ...state, filter: payload }
        case "CLEAR_FILTERS":
            return {
                filter: "idle",
                sortBy: null,
                categories: [],
                priceLow: 1,
                priceHigh: 1000,
            };
        default:
            return { ...state }
    }
}