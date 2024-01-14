import dayjs from "dayjs";
export const genKey = () => {
    return Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
}

export const checkWishListed = (wishlist, id) => {
    return wishlist.some(item => item._id === id)
}

export const UIformatDate = (date) => {
    return dayjs(date).format("MMMM D, YYYY h:mm A")
}