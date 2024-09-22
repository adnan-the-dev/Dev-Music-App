import record from "../../images/record.svg";
import recordArm from "../../images/record-arm.svg";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleChangeRoute = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.main}>
          <h1>Page Not Found</h1>
          <p>
            Oops! It looks like the page you are searching for does not exist.
          </p>
          <span onClick={handleChangeRoute}>Go Back Home</span>
        </div>
      </div>
      <div className={styles.right}>
        <img src={record} alt="record" className={styles.record} />
        <img src={recordArm} alt="record-arm" className={styles.record_arm} />
      </div>
    </div>
  );
};

export default NotFound;
