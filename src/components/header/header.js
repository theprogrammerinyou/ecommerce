import { useState } from "react";
import styles from "./header.module.scss";
import { IconButton, List, ListItem, Avatar } from "react-felix-ui";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/svg/logo.svg";
import { useAuth } from "@providers/auth-provider";
import { useBasket } from "@providers/basket-provider";
import { useWishlist } from "@providers/wishlist-provider";
import { useClickOutside } from "@mantine/hooks";

import { DropDownMenu, DropDownItem } from "../dropdown/dropdown";
import {
  AiFillShop,
  BiSearch,
  RiShoppingBasket2Fill,
  RiHeartAddFill,
  RiUser6Fill,
  MdPowerSettingsNew,
} from "@icons";

const Header = () => {
  const { UserState, AuthDispatcher } = useAuth();
  const {
    BasketState: { items: BasketItems },
    BasketDispatcher,
  } = useBasket();
  const { WishlistState, setWishlistState } = useWishlist();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useClickOutside(() => setDropdown(false));
  const hideDropDown = () => setDropdown(false);
  const navigate = useNavigate();

  const logout = () => {
    AuthDispatcher({
      type: "REMOVE_USER",
    });
    BasketDispatcher({
      type: "EMPTY_BASKET",
    });
    setWishlistState([]);
    navigate("/");
  };

  return (
    <>
      <header className={styles.container}>
        <div className={styles.wrapper}>
          <Link to="/">
            {" "}
            {/* <Logo className={styles.logo} alt="felix logo" /> */}
            Logo
          </Link>
          <div className={styles.sub_wrapper}>
            <div className={styles.search__container}>
              <select name="cars" id="cars">
                <option value="volvo">All Category</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <input type="text" placeholder="Search for item..." />
              <BiSearch />
            </div>
            <nav className={styles.links}>
              <List orientation="horizontal" className={styles.gap}>
                <ListItem>
                  <Link to="/shop" className={styles.link}>
                    <IconButton icon={<AiFillShop />} className={styles.icon} />
                    Shop
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/wishlist" className={styles.link}>
                    <IconButton
                      icon={<RiHeartAddFill />}
                      className={styles.icon}
                      showBadge={WishlistState.length !== 0}
                      badgeNumber={WishlistState.length}
                    />
                    Wishlist
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/checkout/basket" className={styles.link}>
                    <IconButton
                      icon={<RiShoppingBasket2Fill />}
                      className={styles.icon}
                      showBadge={BasketItems.length !== 0}
                      badgeNumber={BasketItems.length}
                    />
                    Basket
                  </Link>
                </ListItem>
                <ListItem className={styles.dropdownNav}>
                  <span
                    className={styles.link}
                    onClick={() => setDropdown((state) => !state)}
                  >
                    {UserState._id !== "" ? (
                      <Avatar
                        size="sm"
                        name={UserState.name}
                        className={styles.avatar}
                      />
                    ) : (
                      <IconButton
                        icon={<RiUser6Fill />}
                        className={styles.icon}
                      />
                    )}
                    Account
                  </span>
                  {UserState._id && dropdown && (
                    <DropDownMenu ref={dropdownRef}>
                      <Link to="/account">
                        <DropDownItem onClick={hideDropDown}>
                          <RiUser6Fill />
                          My Account
                        </DropDownItem>
                      </Link>
                      <DropDownItem
                        onClick={() => {
                          logout();
                          hideDropDown();
                        }}
                        className={styles.logout}
                      >
                        <MdPowerSettingsNew />
                        Sign out
                      </DropDownItem>
                    </DropDownMenu>
                  )}
                  {!UserState._id && dropdown && (
                    <DropDownMenu ref={dropdownRef}>
                      <Link to="/signin">
                        <DropDownItem onClick={hideDropDown}>
                          Sign In
                        </DropDownItem>
                      </Link>
                      <Link to="/signup">
                        <DropDownItem onClick={hideDropDown}>
                          Sign Up
                        </DropDownItem>
                      </Link>
                    </DropDownMenu>
                  )}
                </ListItem>
              </List>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
