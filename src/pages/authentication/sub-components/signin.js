
import styles from "../authentication.module.scss"
import { Input, Button } from "react-felix-ui"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaChevronRight } from "@icons"
import axios from "axios";
import { useToast } from "react-felix-ui"
import { useInputHandler, useSetUserDetails } from "@hooks"
import { forwardRef, useState } from "react"

const Signin = forwardRef((props, ref) => {


    const navigate = useNavigate()
    const SetUserDetails = useSetUserDetails()
    const toast = useToast()
    const location = useLocation()
    /* Check redirection path */
    const from = location.state?.from?.pathname || "/"
    /* Submit button state */
    const [submitState, setSubmitState] = useState(false)
    const [guestState, setGuestState] = useState(false)

    /* Form input handler from useInputHandler hook*/
    const { inputState, inputChange } = useInputHandler({
        email: "",
        password: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitState(true)
        handleSignIn(inputState.email, inputState.password, from, setSubmitState)
    }

    const handleGuest = () => {
        setGuestState(true)
        handleSignIn("electrokart09@gmail.com", "testing1234", from, setGuestState)
    }
    const handleSignIn = (email, password, redirect, setState) => {
        axios.post("/api/auth/login", {
            email: email,
            password: password
        }).then((response) => {
            const user = response.data.foundUser
            toast({
                status: "success",
                message: `Hey ${user.fullName.split(" ")[0]}! Checkout fresh groceries.`,
                duration: 2
            })

            setTimeout(() => {
                localStorage.setItem("felix-store-user-token", response.data.encodedToken)
                SetUserDetails(user, response.data.encodedToken)
                navigate(redirect, { replace: true })
            }, 500)
        }).catch((err) => {
            setState(false)
            toast({
                status: "error",
                message: `Invalid email & password !`,
            })
        })
    }
    return (
        <div className={styles.signin}>
            <div className={styles.heading}>
                <h2>Sign in</h2>
                <Link to="/signup"><Button size="sm" variant="ghost" isRound={true} isTransform={false} >Sign Up <FaChevronRight /> </Button></Link>
            </div>
            <form onSubmit={handleSubmit}>
                <Input type="email" label="Email" name="email" value={inputState.email} ref={ref} onChange={inputChange} />
                <Input type="password" label="Password" name="password" value={inputState.password} onChange={inputChange} />
                <div className={styles.checkbox}>
                    <input id="check" type="checkbox" />
                    <label for="check">Keep me signed in</label>
                </div>
                <div className={styles.form_buttons}>
                    <Button type="submit" isWide={true} isTransform={false} isLoading={submitState}>Sign in</Button>
                    <Button color="gray" onClick={handleGuest} isWide={true} isTransform={false} isLoading={guestState}>Sign in as a guest</Button>
                    <a href="#" className="text-center"> Forgot password?</a>
                </div>
            </form>
        </div>
    )
})

export default Signin