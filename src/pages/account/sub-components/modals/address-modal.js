import styles from "./modals.module.scss"
import {
    Modal,
    ModalBody,
    Input,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "react-felix-ui"
import { useInputHandler } from "@hooks"
import { useEffect, useState } from "react"
import { useAuth } from "@providers/auth-provider"

const AddressModal = ({ isOpen, onClose, definedInputState }) => {
    const [tag, setTag] = useState("Home")
    const [isSaving, setSavingState] = useState(false)
    const { addNewAddress, updateAddress } = useAuth()

    const handleSave = async (e) => {
        e.preventDefault()
        setSavingState(true)
        if (definedInputState) {
            await updateAddress({ ...inputState, tag })
        } else {
            await addNewAddress({ ...inputState, tag })
        }
        setSavingState(false)
        handleClose()
    }

    const handleClose = () => {
        setInputState(initInputState)
        setTag("Home")
        onClose()
    }

    const initInputState = {
        name: "",
        apartment: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pinCode: "",
        mobileNum: "",
        status: false,
        tag: "",
    }
    /* Form input handler from useInputHandler hook*/
    const { inputState, inputChange, setInputState } = useInputHandler(initInputState)
    const { name, apartment, area, landmark, city, state, pinCode, mobileNum } = inputState

    useEffect(() => {
        if (definedInputState) {
            setTag(definedInputState.tag)
            delete definedInputState.tag
            setInputState(definedInputState)
        }
    }, [definedInputState])
    return (
        <Modal size="lg" isOpen={isOpen} onClose={handleClose} title={definedInputState ? "Edit Address" : "Add address"}>
            <ModalBody className={styles.body}>
                <form onSubmit={(e) => handleSave(e)} className={styles.container}>
                    <div className={styles.inputs}>
                        <Input type="text" value={name} label="Full Name" name="name" onChange={inputChange} />
                        <Input type="text" value={mobileNum} label="Mobile Number" name="mobileNum" onChange={inputChange} />
                        <Input type="text" value={apartment} label="Flat, House no., Building, Company, Apartment" name="apartment" onChange={inputChange} />
                        <Input type="text" value={area} label="Area, Street, Sector, Village" name="area" onChange={inputChange} />
                        <Input type="text" value={landmark} label="Landmark" name="landmark" onChange={inputChange} />
                        <Input type="text" value={city} label="Town/City" name="city" onChange={inputChange} />
                        <Input type="text" value={pinCode} label="Pincode" name="pinCode" onChange={inputChange} />
                        <Input type="text" value={state} label="State" name="state" onChange={inputChange} />
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.flex}>
                            <Menu menuPlacement="top-start">
                                <MenuButton size="xs" variant="outline" isTransform={false}>{tag}</MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => setTag("Home")}>Home</MenuItem>
                                    <MenuItem onClick={() => setTag("Work")}>Work</MenuItem>
                                    <MenuItem onClick={() => setTag("Others")}>Other</MenuItem>
                                </MenuList>
                            </Menu>
                            {definedInputState?.status
                                ? <label>Default address</label>
                                : <label htmlFor="check"><input id="check" type="checkbox" name="status" checked={inputState.status} onChange={inputChange} /> Set as my default address</label>}
                        </div>

                        <div className={styles.flex}>
                            <Button onClick={handleClose} color="gray">Cancel</Button>
                            <Button type="submit" isLoading={isSaving}>Save</Button>
                        </div>
                    </div>
                </form>

            </ModalBody>
        </Modal>
    )
}

export default AddressModal