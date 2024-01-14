import styles from "../checkout.module.scss"
import { Button } from "react-felix-ui"
import { IoMdPricetag } from "@icons"
import { useBasket } from "@providers/basket-provider"
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Summary = ({ payment }) => {
    const { BasketState: { mrp, discount, total, itemsCount } } = useBasket()

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [nextCheckoutState, setNextCheckoutState] = useState("address")
    const stage = {
        basket: { key: "Place your order" },
        address: { key: "Proceed to payment" }
    }

    useEffect(() => {
        if (pathname === "/checkout/basket") {
            setNextCheckoutState("basket")
        } else if (pathname === "/checkout/address") {
            setNextCheckoutState("address")
        }
    }, [pathname])

    const handleNavigate = () => {
        if (pathname === "/checkout/basket") {
            navigate("address")
        } else if (pathname === "/checkout/address") {
            payment()
        }
    }
    return (
        <>
            {/* <div className={`${styles.coupon_container} text-w-500`}>
                <span><IoMdPricetag />Apply Coupon</span>
                <Button size="sm" variant="outline" isTransform={false}>Apply</Button>
            </div> */}
            <h6>Price Details ({itemsCount} Items)</h6>
            <div className={styles.order}>
                <div className={styles.breakup}>
                    <div className={styles.item}>
                        <span>Total MRP</span>
                        <span>{mrp}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Discounted on MRP</span>
                        <span className="text-success">{discount}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Coupon Discount</span>
                        <span>2000</span>
                    </div>
                    <div className={styles.item}>
                        <span>Delivery Charges</span>
                        <span className="text-success">Free</span>
                    </div>
                </div>
                <div className={`${styles.item} text-w-600`}>
                    <span>Total Amount</span>
                    <span>{total}</span>
                </div>
            </div>
            <Button size="md" isWide={true} onClick={handleNavigate}>{stage[nextCheckoutState]?.key}</Button>
            <div className={styles.save_offer}>
                <p>You will save <span>Rs.250</span> from the regular market price</p>
            </div>
        </>
    )
}

export default Summary