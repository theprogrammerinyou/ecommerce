import styles from "../account.module.scss"
import { useAuth } from "@providers/auth-provider"
import { Badge, Button, Menu, MenuButton, MenuList, MenuItem } from "react-felix-ui"
import { BsThreeDotsVertical } from "@icons"
import AddressModal from "./modals/address-modal"
import { useEffect, useState } from "react"
import { useBasket } from "@providers/basket-provider"
import { Helmet } from "react-helmet"

const Addresses = ({ outerModalTriggerState, setOuterModalTrigger }) => {
    const [isModalOpen, setModalState] = useState(false)
    const [editAddressData, setEditAddressData] = useState(null)
    const { BasketDispatcher } = useBasket()
    const { UserState: { addresses }, deleteAddress } = useAuth()

    const editAddress = (address) => {
        delete address.createdAt
        delete address.updatedAt
        setEditAddressData(address)
        setOuterModalTrigger ? setOuterModalTrigger(true) : setModalState(true)
    }

    const handleSelect = (e, address) => {
        e.target.checked = true
        BasketDispatcher({
            type: "SET_ADDRESS",
            payload: address
        })
    }

    useEffect(() => {
        !isModalOpen && setEditAddressData(null)
    }, [isModalOpen])

    useEffect(() => {
        const defaultAddress = addresses.filter(address => address.status === true)
        defaultAddress.length === 1 && BasketDispatcher({
            type: "SET_ADDRESS",
            payload: defaultAddress[0]
        })
    }, [addresses])
    return (
        <>
            <Helmet>
                <title>My Addresses | Electro Kart</title>
            </Helmet>
            <div className={styles.addresses}>
                {!setOuterModalTrigger &&
                    <div className={styles.page_header}>
                        <h4>My Addresses</h4>
                        <Button onClick={() => setModalState(true)} size="sm" variant="ghost" >Add New Address</Button>
                    </div>
                }
                <div className={styles.con}>
                    {
                        addresses.map((address) => {
                            return (<div className={styles.address} key={address._id}>
                                {setOuterModalTrigger && <div className={styles.input}>
                                    <input type="radio" name="address" id={address._id} onClick={(e) => handleSelect(e, address)} defaultChecked={address.status} />
                                    <label htmlFor={address._id}></label>
                                </div>
                                }
                                <div className={styles.address_wrapper}>
                                    <div className={styles.actions}>
                                        <span>
                                            <Badge color='primary' variant='outline' className={styles.badge}>{address.tag}</Badge>
                                            {address?.status && <Badge color='gray' variant='outline' className={styles.badge}>Default</Badge>}
                                        </span>
                                        <Menu menuPlacement="left-start">
                                            <MenuButton as="IconButton" icon={<BsThreeDotsVertical />} className={styles.menuIcon} />
                                            <MenuList className={styles.menuList}>
                                                <MenuItem onClick={() => editAddress({ ...address })}>Edit </MenuItem>
                                                <MenuItem onClick={() => deleteAddress(address._id)}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.primary}>
                                            <span>{address.name}</span>
                                            <span>{address.mobileNum}</span>
                                        </div>
                                        <span>{`${address.apartment}, ${address.area}, ${address.landmark}`}</span>
                                        <span>{`${address.city}, ${address.state} - ${address.pinCode}`}</span>
                                    </div>
                                </div>
                            </div>)
                        })
                    }

                </div>

                <AddressModal
                    isOpen={setOuterModalTrigger ? outerModalTriggerState : isModalOpen}
                    onClose={() => setOuterModalTrigger ? setOuterModalTrigger(false) : setModalState(false)}
                    definedInputState={editAddressData}
                />
            </div>
        </>

    )
}

export default Addresses