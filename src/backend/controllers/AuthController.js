import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate } from "../utils/authUtils";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
const sign = require("jwt-encode");
/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, email, password}
 * */

export const signupHandler = function (schema, request) {
  const { email, password, ...rest } = JSON.parse(request.requestBody);
  try {
    // check if email already exists
    const foundUser = schema.users.findBy({ email });
    if (foundUser) {
      return new Response(
        422,
        {},
        {
          errors: ["Unprocessable Entity. Email Already Exists."],
        }
      );
    }
    const _id = uuid();
    const newUser = {
      _id,
      email,
      password,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      ...rest,
      cart: [],
      wishlist: [],
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign({ _id, email }, "secret");
    return new Response(201, {}, { createdUser, encodedToken });
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
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = function (schema, request) {
  const { email, password } = JSON.parse(request.requestBody);
  try {
    const foundUser = schema.users.findBy({ email });
    if (!foundUser) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    if (password === foundUser.password) {
      const encodedToken = sign({ _id: foundUser._id, email }, "secret");
      foundUser.password = undefined;
      return new Response(200, {}, { foundUser, encodedToken });
    }
    new Response(
      401,
      {},
      {
        errors: [
          "The credentials you entered are invalid. Unauthorized access error.",
        ],
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
 * This handler handles user verification.
 * send POST Request at /api/auth/verify
 * body contains {encodedToken}
 * */

export const verifyUser = function (schema, request) {
  const { encodedToken } = JSON.parse(request.requestBody);
  const decodedToken = jwt_decode(encodedToken, "secret");
  try {
    if (decodedToken) {
      const user = this.db.users.findBy({ email: decodedToken.email });
      if (user) {
        return user;
      }
    }
    return new Response(
      401,
      {},
      { errors: ["The token is invalid. Unauthorized access error."] }
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
