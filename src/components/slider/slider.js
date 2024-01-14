import styles from "./slider.module.scss";
import { Button } from "react-felix-ui";
import { Link } from "react-router-dom";
const Slider = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>
          Best Electronic Products <br />
          Big discount
        </h1>
        <p>Save 50% on your first purchase</p>
        <Link to="/shop">
          {" "}
          <Button size="lg">Shop now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Slider;
