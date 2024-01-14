import styles from "./wishlist.module.scss"
import { useWishlist } from "@providers/wishlist-provider"
import { useBasket } from "@providers/basket-provider"
import { ProductWrapper, ProductBody, ProductImage, ProductActions, Button } from "react-felix-ui"
import { MdAdd } from "@icons"
import { Empty } from "@components"
import { Helmet } from "react-helmet"

const Wishlist = () => {

    const { WishlistState, removeFromWishlist } = useWishlist()
    const { addToBasket } = useBasket()

    const handleMoveToBasket = (item) => () => {
        removeFromWishlist(item._id, "no-alert")
        addToBasket(item, { alert: "move" })
    }
    return (
        <>
            <Helmet>
                <title>Wishlist | Electro Kart</title>
            </Helmet>
            <section className={styles.container}>
                {WishlistState.length === 0
                    ? <Empty page="wishlist" />
                    : <div className={styles.wrapper}>
                        <div className={styles.info}>
                            <div>
                                <h3>My Wishlist</h3>
                                <p>You have {WishlistState.length} items in wishlist. Checkout fast !</p>
                            </div>
                        </div>
                        <div className={styles.items_wrapper}>
                            {WishlistState.map((item, i) => {
                                return (
                                    <ProductWrapper key={item.id} onClose={() => removeFromWishlist(item._id)}>
                                        <ProductImage src={require(`@assets/images/${item.img}`)} alt='product' badge={{ text: '30% Off', color: 'yellow' }} />
                                        <ProductBody
                                            title={item.title}
                                            description={item.description}
                                            category={{
                                                name: item.category,
                                            }}
                                            currentPrice={item.currentPrice}
                                            price={item.price}
                                        >
                                            <ProductActions >
                                                <Button size="sm" onClick={handleMoveToBasket(item)} variant="ghost" leftIcon={<MdAdd />}>Move to basket</Button>
                                            </ProductActions>
                                        </ProductBody>
                                    </ProductWrapper>
                                )
                            })
                            }
                        </div>
                    </div>
                }
            </section>
        </>
    )
}

export default Wishlist