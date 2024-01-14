import styles from "./account.module.scss"
import Sidenav from "./sub-components/sidenav"
import { Outlet } from "react-router-dom"
const Account = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Sidenav />
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account