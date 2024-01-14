import styles from "./footer.module.scss";
import { ReactComponent as Logo } from "@assets/svg/logo.svg";
import { Link } from "react-router-dom";
import { AiFillHeart, BiMap, IoIosCall, HiMail } from "@icons";
const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={`${styles.footer_item} ${styles.brand}`}>
        <a href="/">
          {" "}
          {/* <Logo className={styles.logo} alt="felix logo" /> */}
          Logo
        </a>
        <span>Your one stop electronic product store</span>
        <span>© {new Date().getFullYear()}, All rights reserved</span>
        <span>
          Made with <AiFillHeart /> by{" "}
          <a className="text-warning"> Electro Kart</a>{" "}
        </span>
      </div>

      <div className={styles.footer_item}>
        <h5>Categories</h5>
        <ul className="links list-style-none">
          <li>
            <Link to="/shop?categories=vegetables">Vegetables</Link>
          </li>
          <li>
            <Link to="/shop?categories=fruits">Fruits</Link>
          </li>
          <li>
            <Link to="/shop?categories=organic+products">Organic Products</Link>
          </li>
          <li>
            <Link to="/shop?categories=plants">Plants</Link>
          </li>
          <li>
            <Link to="/shop?categories=groceries">Groceries</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer_item}>
        <h5>Account</h5>
        <ul className="links list-style-none">
          <li>
            <Link to="/account">My Account</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/basket">View Basket</Link>
          </li>
          <li>
            <Link to="#">Track Order</Link>
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className={`${styles.footer_item} ${styles.info}`}>
        <h5>Contact Us</h5>
        <ul className="links list-style-none">
          <li>
            <BiMap />{" "}
            <span>
              <span>Location: </span> Gpoinathpur, Kolkata West Bengal - 722101
            </span>
          </li>
          <li>
            <IoIosCall />
            <span>
              <span>Call Us: </span>+91 0000 000000
            </span>
          </li>
          <li>
            <HiMail />
            <span>
              <span>Email: </span>electrokart09@gmail.com
            </span>
          </li>
          <li>Always here to serve your needs</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
