import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
    {
        _id: uuid(),
        categoryName: "fruits",
        img: "fruits.png"
    },
    {
        _id: uuid(),
        categoryName: "vegetables",
        img: "veg.png"
    },
    {
        _id: uuid(),
        categoryName: "plants",
        img: "plant.png"

    },
    {
        _id: uuid(),
        categoryName: "organic products",
        img: "products.png"

    },
    {
        _id: uuid(),
        categoryName: "groceries",
        img: "groceries.png"

    },
];
