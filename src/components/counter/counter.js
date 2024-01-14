import styles from "./counter.module.scss"
import { IconButton } from "react-felix-ui"
import { AiOutlinePlus, AiOutlineMinus } from "@icons"
import { useState } from "react"

const Counter = ({ min = 0, max = 100, set, onDecrease, onIncrease }) => {
    const [current, setCurrent] = useState(set ? set : min)

    const handleDecrease = () => {
        setCurrent(prev => prev === min ? prev : prev - 1)
        if (current !== min) {
            onDecrease && onDecrease()
        }
    }

    const handleIncrease = () => {
        setCurrent(prev => prev === max ? prev : prev + 1)
        if (current !== max) {
            onIncrease && onIncrease()
        }
    }

    return (
        <div className={styles.container}>
            <IconButton icon={<AiOutlineMinus />} onClick={handleDecrease} ariaLabel="number input decrease" className={styles.button} />
            <span className={styles.number}>{current}</span>
            <IconButton icon={<AiOutlinePlus />} onClick={handleIncrease} ariaLabel="number input increase" className={styles.button} />
        </div>
    )
}

export default Counter