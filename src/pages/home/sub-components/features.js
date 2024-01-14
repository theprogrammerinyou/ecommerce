import { featureList } from "./data"
import styles from "../home.module.scss"

const Features = () => {
    return (
        featureList.map((item, i) => {
            return (
                <div key={i} className={styles.feature}>
                    {item.icon}
                    <div className={styles.text}>
                        <h6>{item.title}</h6>
                        <span>{item.des}</span>
                    </div>
                </div>
            )
        })
    )
}

export default Features