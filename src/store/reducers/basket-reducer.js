export const BasketReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_ITEMS":
            const mrp = payload.reduce((prev, current) => parseInt(prev) + (parseInt(current.price) * current.qty), 0)
            const total = payload.reduce((prev, current) => parseInt(prev) + (parseInt(current.currentPrice) * current.qty), 0)
            const discount = mrp - total
            const itemsCount = payload.reduce((prev, current) => parseInt(prev) + current.qty, 0)
            return { ...state, items: payload, mrp, total, discount, itemsCount }

        case "SET_ADDRESS":
            return { ...state, address: payload }
        case "EMPTY_BASKET":
            return {
                items: [],
                mrp: 0,
                total: 0,
                discount: 0,
                itemsCount: 0,
                address: "",
            }
        default:
            return state
    }
}
