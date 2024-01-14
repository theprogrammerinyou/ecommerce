import styles from "../home.module.scss"
import useCountDown from "@hooks/useCountDown"

const Countdown = ({ timer }) => {
    const { days, hours, minutes, seconds } = useCountDown(timer)
    return (
        <div className={styles.timer}>
            <span className={styles.timer_block}>
                <span>{days}</span>
                <span>Days</span>
            </span>
            <span className={styles.timer_block}>
                <span>{hours}</span>
                <span>Hours</span>
            </span>
            <span className={styles.timer_block}>
                <span>{minutes}</span>
                <span>Mins</span>
            </span>
            <span className={styles.timer_block}>
                <span>{seconds}</span>
                <span>Sec</span>
            </span>
        </div>
    )
}

export default Countdown