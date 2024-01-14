
export const productCountByCategory = (products, categories) => {
    for (let i = 0; i < categories.length; i++) {
        const productCount = products.reduce((prev, current) => {
            return current.category === categories[i].categoryName ? prev + 1 : prev
        }, 0)
        categories[i].productCount = productCount
    }
    return categories
}

export const fetchFilterStateFromParams = (params) => {
    const init = {
        filter: "idle",
        sortBy: null,
        categories: [],
        priceLow: 1,
        priceHigh: 1000,
    }
    return [...params].reduce(reducer, init)
}

const reducer = (prev, current) => {
    const [key, value] = current
    switch (key) {
        case "categories":
            return {
                ...prev,
                categories: [...prev.categories, value]
            }
        case "rating":
            return {
                ...prev,
                rating: value
            }
        case "sortBy":
            return {
                ...prev,
                sortBy: value
            }
        case "priceLow":
            return {
                ...prev,
                priceLow: value
            }
        case "priceHigh":
            return {
                ...prev,
                priceHigh: value
            }
        default:
            return prev
    }
}