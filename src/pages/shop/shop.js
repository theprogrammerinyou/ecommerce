import styles from "./shop.module.scss";
import { ProductWrapper } from "react-felix-ui";
import Categories from "./sub-components/categories";
import Filters from "./sub-components/filters";
import { useFilter } from "@providers/filter-provider";
import { useBasket } from "@providers/basket-provider";
import { useWishlist } from "@providers/wishlist-provider";
import { useProducts } from "@providers/product-provider";
import useFilteredProducts from "@hooks/useFilteredProducts";
import { checkWishListed } from "@global/js";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RenderProduct from "./sub-components/RenderProduct";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { products } = useProducts();
  const {
    FilterState: { filter },
    FilterDispatcher,
  } = useFilter();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterProducts = useFilteredProducts();
  const { addToBasket, checkPresence } = useBasket();
  const { WishlistState, wishlistToggle } = useWishlist();

  useEffect(() => {
    if ([...searchParams].length === 0) {
      FilterDispatcher({ type: "CLEAR_FILTERS" });
      const temp = products.length !== 0 && filterProducts(products, true);
      setFilteredProducts(temp);
    } else {
      const temp = products.length !== 0 && filterProducts(products);
      setFilteredProducts(temp);
    }
  }, [products, searchParams]);

  return (
    <>
      <Helmet>
        <title>Shop Best | Electro Kart</title>
      </Helmet>
      <section className={styles.container}>
        <aside className={styles.filter__wrapper}>
          <Categories />
          <Filters />
        </aside>
        <div className={styles.product__container}>
          {filter === "done" && filteredProducts.length === 0 && (
            <h1>Not found 404</h1>
          )}
          {filter === "processing" || filter === "idle"
            ? [...Array(10)].map((_, i) => {
                return (
                  <ProductWrapper key={i} isLoading={true}></ProductWrapper>
                );
              })
            : filteredProducts.map((product, i) => {
                const isWislisted = checkWishListed(WishlistState, product._id);
                const isAdd = checkPresence(product._id);
                return (
                  <RenderProduct
                    key={product._id}
                    product={product}
                    isWislisted={isWislisted}
                    isAdd={isAdd}
                    handlewishlistToggle={wishlistToggle}
                    handleaddToBasket={addToBasket}
                  />
                );
              })}
        </div>
      </section>
    </>
  );
};

export default Shop;
