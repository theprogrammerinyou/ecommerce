import styles from "../authentication.module.scss"
import { Input, Button } from "react-felix-ui"
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "@icons"
import axios from "axios";
import { useToast } from "react-felix-ui"
import { useInputHandler, useSetUserDetails } from "@hooks"
import { useState, forwardRef } from "react"

const Signup = forwardRef((props, ref) => {


    const navigate = useNavigate()
    const SetUserDetails = useSetUserDetails()

    const toast = useToast()
    const [btnState, setBtnState] = useState(false)

    const { inputState, inputChange } = useInputHandler({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setBtnState(true)
        axios.post("/api/auth/signup", {
            fullName: inputState.name,
            email: inputState.email,
            password: inputState.password
        }).then((response) => {
            const user = response.data.createdUser
            toast({
                status: "success",
                message: `Hey ${user.fullName.split(" ")[0]} ! Checkout fresh groceries.`,
                duration: 2
            })
            setTimeout(() => {
                localStorage.setItem("felix-store-user-token", response.data.encodedToken)
                SetUserDetails(user, response.data.encodedToken)
                navigate("/shop")
            }, 500)
        }).catch((err) => {
            setBtnState(false)
            toast({
                status: "error",
                message: `Invalid email & password !`,
            })
        })
    }

    return (
        <div className={styles.signup}>
            <div className={styles.heading}>
                <Link to="/signin"><Button size="sm" variant="ghost" isRound={true} isTransform={false} ><FaChevronLeft /> Sign In</Button></Link>
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Full name" name="name" value={inputState.name} onChange={inputChange} ref={ref} />
                <Input type="email" label="Email" name="email" value={inputState.email} onChange={inputChange} />
                <Input type="password" label="Password" name="password" value={inputState.password} onChange={inputChange} />
                <div className={styles.checkbox}>
                    <input id="check" type="checkbox" />
                    <label for="check">Keep me signed in</label>
                </div>
                <div className={styles.form_buttons}>
                    <Button type="submit" isWide={true} isTransform={false} isLoading={btnState} >Sign Up</Button>
                </div>
            </form>
        </div>
    )
})

export default Signup