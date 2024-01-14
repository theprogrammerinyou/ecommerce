import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to user data are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

export const placeOrder = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
        if (!userId) {
            new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }
        const orders = schema.users.findBy({
            _id: userId,
        }).orders || []

        const { order } = JSON.parse(request.requestBody);

        orders.push({
            ...order,
            _id: uuid(),
            createdAt: formatDate(),
            updatedAt: formatDate(),
        })

        this.db.users.update(
            {
                _id: userId,
            },
            {
                orders: orders,
            }
        );
        return new Response(
            201,
            {},
            {
                orders: orders,
            }
        );
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
}
/**
 * This handler handles adding new address to user's addresses.
 * send POST Request at /api/user/address
 * */

export const addAddressHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
        if (!userId) {
            new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }
        const userAddresses = schema.users.findBy({
            _id: userId,
        }).addresses || []
        const { address } = JSON.parse(request.requestBody);

        if (address.status) {
            userAddresses.map((item) => item.status = false)
        }
        userAddresses.push({
            ...address,
            _id: uuid(),
            createdAt: formatDate(),
            updatedAt: formatDate(),
            status: userAddresses.length === 0 ? true : address.status
        });


        this.db.users.update(
            {
                _id: userId,
            },
            {
                addresses: userAddresses,
            }
        );
        return new Response(
            201,
            {},
            {
                addresses: userAddresses,
            }
        );
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles removing address from user's addresses
 * send DELETE Request at /api/user/address/:addressId
 * */

export const deleteAddressHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
        if (!userId) {
            new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }
        let userAddresses = schema.users.findBy({
            _id: userId,
        }).addresses;

        const addressId = request.params.addressId;

        userAddresses = userAddresses.filter((item) => item._id !== addressId);
        if (userAddresses.length === 1) {
            userAddresses[0].status = true
        }
        this.db.users.update(
            {
                _id: userId,
            },
            {
                addresses: userAddresses,
            }
        );
        return new Response(
            200,
            {},
            {
                addresses: userAddresses,
            }
        );
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles updating user's address.
 * send POST Request at /api/user/address/:addressId
 * */

export const updateAddressHandler = function (schema, request) {
    const addressId = request.params.addressId;
    const userId = requiresAuth.call(this, request);
    try {
        if (!userId) {
            new Response(
                404,
                {},
                {
                    errors: ["The email you entered is not Registered. Not Found error"],
                }
            );
        }

        let userAddresses = schema.users.findBy({
            _id: userId,
        }).addresses;

        const { address } = JSON.parse(request.requestBody);

        userAddresses = userAddresses.map((item) => {
            let temp = item;
            if (item._id === addressId) {
                temp = { ...address, updatedAt: formatDate() }
            }
            if (address.status === true && item._id !== addressId) {
                temp.status = false
            }
            return temp
        });

        this.db.users.update(
            {
                _id: userId,
            },
            {
                addresses: userAddresses,
            }
        );
        return new Response(
            200,
            {},
            {
                addresses: userAddresses,
            }
        );
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};