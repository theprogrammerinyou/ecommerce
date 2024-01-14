import styles from "../account.module.scss"
import { Button } from "react-felix-ui"
import { useAuth } from "@providers/auth-provider"
import DetailsModal from "./modals/details-modal"
import { useState } from "react"
import { UIformatDate } from "@global/js"
import { Helmet } from "react-helmet"

const Details = () => {
    const [isModalOpen, setModalState] = useState(false)
    const { UserState } = useAuth()
    return (
        <>
            <Helmet>
                <title> Account Details | Electro Kart</title>
            </Helmet>
            <div className={styles.details}>
                <div className={styles.page_header}>
                    <h4>Account Details</h4>
                    <div className={styles.actions}>
                        <Button size="sm" variant="ghost">Change Password</Button>
                        <Button size="sm" variant="ghost" onClick={() => setModalState(true)}>Edit Details</Button>
                    </div>
                </div>

                <div className={styles.item}>
                    <h5>Personal Information</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Full Name</td>
                                <td>{UserState.name}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{UserState.gender || "---.---"}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{UserState.location || "---.---"}</td>
                            </tr>
                            <tr>
                                <td>Joined On</td>
                                <td>{UIformatDate(UserState.createdAt)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.item}>
                    <h5>Contact Information</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Mobile Number</td>
                                <td>{UserState.mobileNum || "---.---"}</td>
                            </tr>
                            <tr>
                                <td>Email ID</td>
                                <td>{UserState.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <DetailsModal isOpen={isModalOpen} onClose={() => setModalState(false)} />
            </div>
        </>
    )
}

export default Details