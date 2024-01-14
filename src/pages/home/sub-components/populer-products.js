import { ProductWrapper, ProductBody, ProductImage, ProductActions, Button, IconButton } from "react-felix-ui"
import { AiFillHeart, AiOutlineHeart, MdAdd } from "@icons"
import { useProducts } from "@providers/product-provider"
import { useBasket } from "@providers/basket-provider"
import { useWishlist } from "@providers/wishlist-provider"
import { checkWishListed } from "@global/js"

const PopularProducts = () => {
    const { products } = useProducts()
    const { addToBasket } = useBasket()
    const { WishlistState, wishlistToggle } = useWishlist()

    return (
        products.slice(0, 10).map((item, i) => {
            const isWislisted = checkWishListed(WishlistState, item._id)
            return (
                <ProductWrapper key={item._id}>
                    <ProductImage src={require(`@assets/images/${item.img}`)} alt='product' badge={item.badge} />
                    <ProductBody
                        title={item.title}
                        description={item.description}
                        category={{
                            name: item.category,
                        }}
                        vendor={{
                            name: item.vendor,
                        }}
                        rating={item.rating}
                        currentPrice={item.currentPrice}
                        price={item.price}
                    >
                        <ProductActions>
                            <IconButton onClick={() => wishlistToggle(item)} icon={isWislisted ? <AiFillHeart /> : <AiOutlineHeart />} className="like-btn" />
                            <Button onClick={() => addToBasket(item)} size="sm" variant="ghost" leftIcon={<MdAdd />}>Add</Button>
                        </ProductActions>
                    </ProductBody>
                </ProductWrapper>
            )
        })
    )
}

export default PopularProducts