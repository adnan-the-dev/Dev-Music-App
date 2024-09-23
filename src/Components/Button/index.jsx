import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

const Button = ({ label, isLoading, ...rest }) => {
  return (
    <button {...rest} className={styles.primary_btn}>
      {isLoading ? (
        <CircularProgress size={25} style={{ color: "black" }} />
      ) : (
        `${label}`
      )}
    </button>
  );
};

export default Button;
