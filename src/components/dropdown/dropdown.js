import styles from "./dropdown.module.scss"
import { Link } from "react-router-dom"
import { forwardRef } from "react"

const DropDownMenu = forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className={styles.container}>
            <ul>
                {children}
            </ul>
        </div>
    )
})

const DropDownItem = ({ onClick, className, children }) => {
    return (
        <li className={className} onClick={onClick}>{children}</li>
    )
}

export { DropDownMenu, DropDownItem }

