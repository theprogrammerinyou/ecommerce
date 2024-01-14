import styles from "../home.module.scss"
import { Image } from "react-felix-ui"
import { useProducts } from "@providers/product-provider"
import { Link } from "react-router-dom"
const Catagories = () => {
    const { categories } = useProducts()
    return (
        categories.map((item, i) => {
            return (
                <Link key={i} to={`/shop?categories=${item.categoryName.toLowerCase()}`} className={styles.item}>
                    <Image src={require(`@assets/images/${item?.img}`)} alt={item.categoryName} className={styles.image} />
                    <span>{item.categoryName}</span>
                    <span>{item.productCount} items</span>
                </Link>
            )
        })
    )
}

export default Catagories