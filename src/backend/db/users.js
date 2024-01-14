import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    fullName: "Electro Kart",
    email: "electrokart09@gmail.com",
    password: "testing1234",
    gender: "Male",
    location: "Hyderabad",
    mobileNum: "123493303",
    addresses: [
      {
        _id: uuid(),
        name: "Electro Kart",
        apartment: "43/2A",
        area: "random area",
        landmark: "random landmark",
        city: "Hyderabad",
        state: "Telangana",
        pinCode: "203933",
        mobileNum: "123493303",
        status: true,
        tag: "Home",
      },
    ],
    orders: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
