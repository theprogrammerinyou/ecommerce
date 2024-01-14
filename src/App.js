import { Routes, Route } from "react-router-dom";
import {
  Authentication,
  Checkout,
  Home,
  Product,
  Shop,
  Wishlist,
  Account,
  Error404,
} from "@pages";
import {
  Header,
  Footer,
  RequireAuth,
  RestrictAuth,
  ScrollToTop,
} from "@components";
import { FilterProvider } from "@providers/filter-provider";
import Details from "./pages/account/sub-components/details";
import Orders from "./pages/account/sub-components/orders";
import Addresses from "./pages/account/sub-components/addresses";
import TrackOrders from "./pages/account/sub-components/track-orders";
import BasketItems from "./pages/checkout/sub-components/basket-items";
import CheckoutAddress from "./pages/checkout/sub-components/checkout-address";
import OrderPlaced from "./pages/checkout/sub-components/order-placed";
import Mockman from "mockman-js";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/shop"
            element={
              <FilterProvider>
                <Shop />
              </FilterProvider>
            }
          ></Route>
          <Route element={<RequireAuth />}>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/checkout" element={<Checkout />}>
              <Route path="basket" element={<BasketItems />}></Route>
              <Route path="address" element={<CheckoutAddress />}></Route>
              <Route path="order-placed" element={<OrderPlaced />}></Route>
            </Route>
            <Route path="/account" element={<Account />}>
              <Route index element={<Details />}></Route>
              <Route path="orders" element={<Orders />}></Route>
              <Route path="addresses" element={<Addresses />}></Route>
              <Route path="track-orders" element={<TrackOrders />}></Route>
            </Route>
          </Route>
          <Route path="/product" element={<Product />}></Route>
          <Route element={<RestrictAuth />}>
            <Route path="/signin" element={<Authentication />}></Route>
            <Route path="/signup" element={<Authentication />}></Route>
          </Route>
          <Route path="/mock" element={<Mockman />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </ScrollToTop>
      <Footer />
    </>
  );
}

export default App;
