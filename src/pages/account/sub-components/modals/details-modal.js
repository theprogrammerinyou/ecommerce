import styles from "./modals.module.scss"
import {
    Modal,
    ModalBody,
    Input,
    Button,
} from "react-felix-ui"
import { useInputHandler } from "@hooks"
import { useEffect, useState } from "react"
import { useAuth } from "@providers/auth-provider"

const DetailsModal = ({ isOpen, onClose }) => {
    const [isSaving, setSavingState] = useState(false)
    const { UserState, updateAccountDetails } = useAuth()

    const initInputState = {
        name: UserState.name,
        email: UserState.email,
        gender: UserState.gender,
        location: UserState.location,
        mobileNum: UserState.mobileNum,
    }

    const { inputState, inputChange, setInputState } = useInputHandler(initInputState)

    const { name, email, gender, location, mobileNum } = inputState

    const handleSave = async (e) => {
        e.preventDefault()
        setSavingState(true)

        setSavingState(false)
        handleClose()
    }

    const handleClose = () => {
        setInputState(initInputState)
        onClose()
    }
    return (
        <Modal size="lg" isOpen={isOpen} onClose={handleClose} title={"Edit account details"}>
            <ModalBody className={styles.body}>
                <form onSubmit={(e) => handleSave(e)} className={styles.container}>
                    <div className={styles.inputs}>
                        <Input type="text" value={name} label="Full Name" name="name" onChange={inputChange} />
                        <Input type="text" value={mobileNum} label="Mobile Number" name="mobileNum" onChange={inputChange} />
                        {/* <Input type="text" value={apartment} label="Flat, House no., Building, Company, Apartment" name="apartment" onChange={inputChange} />
                        <Input type="text" value={area} label="Area, Street, Sector, Village" name="area" onChange={inputChange} />
                        <Input type="text" value={landmark} label="Landmark" name="landmark" onChange={inputChange} />
                        <Input type="text" value={city} label="Town/City" name="city" onChange={inputChange} />
                        <Input type="text" value={pinCode} label="Pincode" name="pinCode" onChange={inputChange} />
                        <Input type="text" value={state} label="State" name="state" onChange={inputChange} /> */}
                    </div>
                    <div className={styles.actions}>

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

export default DetailsModal