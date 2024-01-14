export const productFilterByCategories = (products, categories) => {
    return categories.length !== 0 ? products.slice(0).filter((item) => categories.includes(item.category)) : products
}
export const productFilterByPriceRange = (data, low, high) => {
    return [...data].filter(
        ({ currentPrice }) => currentPrice >= low && currentPrice <= high
    );
};
export const sortProducts = (products, key) => {
    const productCopy = [...products]
    switch (key) {
        case "Price - High to Low":
            return productCopy.sort(
                (item1, item2) =>
                    Number(item2.currentPrice) - Number(item1.currentPrice)
            );
        case "Price - Low to High":
            return productCopy.sort(
                (item1, item2) =>
                    Number(item1.currentPrice) - Number(item2.currentPrice)
            );
        case "Customer Ratings":
            return productCopy.sort(
                (item1, item2) =>
                    Number(item2.rating) - Number(item1.rating)
            );
        default:
            return products
    }
}