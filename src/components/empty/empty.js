import styles from "./empty.module.scss"
import Icon from '@assets/images/vegetable.png'
import { Image, Button } from "react-felix-ui"
import { Link } from "react-router-dom"
const Empty = ({ page }) => {
    return (
        <div className={styles.container}>
            <Image src={Icon} alt="vegetable icon" className={styles.image} />
            <h1>Your {page} is empty</h1>
            <p>Checkout our fresh collection of fruits and vegetables!!!</p>
            <Link to="/shop"><Button variant="outline">Shop now</Button></Link>
        </div>
    )
}

export default Empty