import styles from "../checkout.module.scss";
import { useWishlist } from "@providers/wishlist-provider";
import { useBasket } from "@providers/basket-provider";
import {
  ProductWrapper,
  ProductBody,
  ProductImage,
  ProductActions,
  Button,
  Modal,
  ModalBody,
} from "react-felix-ui";
import { MdAdd } from "@icons";
import { Counter } from "@components";
import { useState } from "react";
import { Helmet } from "react-helmet";

const BasketItems = () => {
  const {
    BasketState: { items: BasketItems, itemsCount },
    updateProductQty,
    removeFromBasket,
    removeAllFromBasket,
  } = useBasket();
  const { addToWishlist } = useWishlist();
  const [isModalOpen, setModal] = useState(false);

  const handleMoveToWishlist = (item) => () => {
    removeFromBasket(item._id);
    addToWishlist(item);
  };

  const handleRemoveAll = () => {
    removeAllFromBasket("removed");
    setModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Basket | Electro Kart</title>
      </Helmet>
      <div className={styles.item_container}>
        <div className={styles.info}>
          <div>
            <h3>My Basket</h3>
            <p>You have {itemsCount} items in the basket. Checkout fast !</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setModal(true)}
            isRound={true}
            isTransform={false}
            color="danger"
          >
            Remove all
          </Button>
        </div>
        <div className={styles.items_wrapper}>
          {BasketItems.map((item, i) => {
            return (
              <div>
                <ProductWrapper
                  style="horizontal"
                  key={item._id}
                  onClose={() => removeFromBasket(item._id)}
                >
                  <ProductImage
                    src={require(`@assets/images/${item.img}`)}
                    alt="product"
                  />
                  <ProductBody
                    title={item.title}
                    description={item.description}
                    category={{
                      name: item.category,
                    }}
                    currentPrice={item.currentPrice}
                    price={item.price}
                  >
                    <ProductActions newLine>
                      <Counter
                        min={1}
                        set={item.qty}
                        onDecrease={() => updateProductQty("DEC", item._id)}
                        onIncrease={() => updateProductQty("INC", item._id)}
                      />
                      <Button
                        size="sm"
                        isTransform={false}
                        onClick={handleMoveToWishlist(item)}
                        variant="ghost"
                        leftIcon={<MdAdd />}
                      >
                        Wishlist
                      </Button>
                    </ProductActions>
                  </ProductBody>
                </ProductWrapper>
              </div>
            );
          })}
        </div>
        <Modal
          size="sm"
          isOpen={isModalOpen}
          onClose={() => setModal(false)}
          title="Are you sure?"
        >
          <ModalBody>
            <p>All the items in the basket will be removed!</p>
            <div className={styles.actions}>
              <Button color="gray" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button color="danger" onClick={handleRemoveAll}>
                Remove All
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default BasketItems;
