import styles from "./checkout.module.scss";
import { useBasket } from "@providers/basket-provider";
import { useAuth } from "@providers/auth-provider";
import { Empty } from "@components";
import Summary from "./sub-components/summary";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { RiShoppingBasket2Fill, BiMap } from "@icons";
import { useToast } from "react-felix-ui";

const Basket = () => {
  const {
    BasketState: { items: BasketItems, mrp, discount, total, address },
    removeAllFromBasket,
  } = useBasket();
  const { UserState, placeOrder } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast({
        status: "error",
        message: "Razorpay SDK failed to load, check you connection",
        duration: 2,
      });
      return;
    }

    const options = {
      key: "rzp_test_PaDnzdvZKlWoj3",
      amount: total * 100,
      currency: "INR",
      name: "Electro Kart",
      description: "Thank you for shopping with us",
      handler: async function (response) {
        const order = {
          payment_id: response.razorpay_payment_id,
          address: address,
          items: BasketItems,
          mrp,
          total,
          discount,
        };
        await placeOrder(order);
        removeAllFromBasket({ alert: "no-alert" });
        navigate("order-placed", { state: { orderPlaced: true } });
      },

      prefill: {
        name: UserState.name,
        email: UserState.email,
        contact: UserState.mobileNum,
      },

      theme: {
        color: "#3bb57c",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    if (
      pathname === "/checkout" ||
      (pathname === "/checkout/address" && BasketItems.length === 0)
    ) {
      navigate("basket");
    }
  }, [pathname, BasketItems]);

  return (
    <section className={styles.container}>
      {BasketItems.length === 0 && pathname !== "/checkout/order-placed" ? (
        <Empty page="basket" />
      ) : (
        <div className={styles.wrapper}>
          {pathname !== "/checkout/order-placed" && (
            <div className={styles.progress_container}>
              <span></span>
              <div
                className={`${styles.icons} ${
                  pathname === "/checkout/basket" && styles.active
                }`}
              >
                <RiShoppingBasket2Fill />
              </div>
              <div
                className={`${styles.icons} ${
                  pathname === "/checkout/address" && styles.active
                }`}
              >
                <BiMap />
              </div>
              <div
                className={`${styles.icons} ${
                  pathname === "/checkout/payment" && styles.active
                }`}
              >
                ₹
              </div>
            </div>
          )}
          <Outlet />
          {pathname !== "/checkout/order-placed" && (
            <aside className={styles.summary_container}>
              <Summary payment={displayRazorpay} />
            </aside>
          )}
        </div>
      )}
    </section>
  );
};

export default Basket;
