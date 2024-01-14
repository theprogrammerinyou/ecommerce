import styles from "../account.module.scss"
import { NavLink } from "react-router-dom"
import { RiUser6Fill, RiShoppingBasket2Fill, BiMap, HiOutlinePaperAirplane, HiOutlineLogout } from "@icons"
const Sidenav = () => {

    const handleActiveNav = (navigationData) => {
        return navigationData.isActive ? styles.active : ""
    }

    return (
        <aside className={`${styles.nav_container}`}>
            <ul>
                <li>
                    <NavLink className={
                        (navigationData) => handleActiveNav(navigationData) + " " + styles.nav_item
                    } to="" end>
                        <RiUser6Fill />
                        Account Details
                    </NavLink>
                </li>
                <li>
                    <NavLink className={
                        (navigationData) => handleActiveNav(navigationData) + " " + styles.nav_item
                    } to="orders">
                        <RiShoppingBasket2Fill />
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink className={
                        (navigationData) => handleActiveNav(navigationData) + " " + styles.nav_item
                    } to="addresses">
                        <BiMap />
                        My Addresses
                    </NavLink>
                </li>
                <li>
                    <NavLink className={
                        (navigationData) => handleActiveNav(navigationData) + " " + styles.nav_item
                    } to="track-orders">
                        <HiOutlinePaperAirplane />
                        Track Orders
                    </NavLink>
                </li>
                <li>
                    <button className={`${styles.nav_item} ${styles.logout}`}>
                        <HiOutlineLogout />Logout
                    </button>
                </li>
            </ul>
        </aside>
    )
}

export default Sidenav