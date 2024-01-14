import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-felix-ui/dist/cjs/index.css'
import './global/css/global.scss'
import { makeServer } from "./server";
import { ProductProvider } from "@providers/product-provider"
import { AuthProvider } from "@providers/auth-provider"
import { BasketProvider } from "@providers/basket-provider"
import { WishlistProvider } from "@providers/wishlist-provider"
import { FelixProvider } from "react-felix-ui"
import { BrowserRouter as Router } from "react-router-dom";

// Call make Server
makeServer();
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <FelixProvider className="toast-container">
                <ProductProvider>
                    <BasketProvider>
                        <WishlistProvider>
                            <AuthProvider>
                                <App />
                            </AuthProvider>
                        </WishlistProvider>
                    </BasketProvider>
                </ProductProvider>
            </FelixProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

