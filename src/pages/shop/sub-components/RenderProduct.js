import React from 'react'
import { ProductWrapper, ProductBody, ProductImage, ProductActions, Button, IconButton } from "react-felix-ui"
import { AiFillHeart, AiOutlineHeart, MdAdd } from "@icons"

const RenderProduct = React.memo(({ product, handlewishlistToggle, isAdd, handleaddToBasket, isWislisted }) => {

    return <ProductWrapper isOutStock={product.stock === "0"}>
        <ProductImage src={require(`@assets/images/${product.img}`)} alt='product' badge={product.badge} />
        <ProductBody
            title={product.title}
            description={product.description}
            category={{
                name: product.category,
            }}
            vendor={{
                name: product.vendor,
            }}
            rating={product.rating}
            currentPrice={product.currentPrice}
            price={product.price}
        >
            <ProductActions>
                <IconButton onClick={() => handlewishlistToggle(product)} icon={isWislisted ? <AiFillHeart /> : <AiOutlineHeart />} className="like-btn" />
                <Button onClick={() => handleaddToBasket(product, "", isAdd)} size="sm" variant="ghost" leftIcon={<MdAdd />}>Add</Button>
            </ProductActions>
        </ProductBody>
    </ProductWrapper>
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})

export default RenderProduct