import styles from "../account.module.scss"
import { Image, Button } from "react-felix-ui"
import { useAuth } from "@providers/auth-provider"
import { UIformatDate } from "@global/js"
import { Helmet } from "react-helmet"

const Orders = () => {
    const { UserState: { orders } } = useAuth()

    return (
        <div className={styles.orders}>
            <Helmet>
                <title>My Orders | Electro Kart</title>
            </Helmet>
            <div className={styles.page_header}>
                <h4>My Orders</h4>
                <p>All the order placed by you is listed here.</p>
            </div>
            {
                orders?.reverse().map((order) => {
                    return (<div className={styles.item}>
                        <div className={styles.item_info}>
                            <span>Order ID: {order._id}</span>
                            <div>
                                <span>Placed on : {UIformatDate(order.createdAt)}</span>
                                <span className={styles.total}>Total : <span> ₹ {order.total}</span></span>
                            </div>
                        </div>
                        {
                            order.items.map((item) => {
                                return (
                                    <div className={styles.product}>
                                        <div className={styles.image}>
                                            <Image src={require(`@assets/images/${item.img}`)} />
                                        </div>
                                        <div className={styles.info}>
                                            <a href="#" className={styles.name}>{item.title}</a>
                                            <div>
                                                <span className={styles.price}>Rs. {item.currentPrice}</span>
                                                <span className={styles.qty}>Quantity : {item.qty}</span>
                                            </div>
                                        </div>
                                        <Button size="sm" color="warning" variant="ghost">Buy again</Button>
                                    </div>
                                )
                            })
                        }

                    </div>)
                })
            }



        </div>
    )
}

export default Orders