import styles from "../checkout.module.scss"
import successGif from "@assets/images/success.gif"
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "react-felix-ui"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

const OrderPlaced = () => {
    const { state: { orderPlaced } } = useLocation()
    const navigate = useNavigate()
    !orderPlaced && navigate('basket')
    return (
        <>
            <Helmet>
                <title>Order Placed | Electro Kart</title>
            </Helmet>
            <div className={styles.placedOrder_container}>
                <img src={successGif} alt="" />
                <h2>Order Placed</h2>

                <p>Thank you for shopping with us. You can check your order summary from accounts page.</p>
                <div className={styles.actions}>
                    <Link to="/account/orders"><Button isRound>My Orders</Button></Link>
                    <Link to="/shop"><Button variant="outline" isRound>Shop More</Button></Link>
                </div>
            </div>
        </>

    )
}

export default OrderPlaced