import { useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import TextField from "../../Components/Inputs/TextFeilds";
import Checkbox from "../../Components/Inputs/CheckBox";
import Button from "../../Components/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
// import logo from "../../images/black_logo.svg";
import logo from "../../assets/logo.png";
import styles from "./styles.module.scss";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleInputState = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors({ ...errors, [name]: value });
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log(data);
    } else {
      console.log("please fill out properly");
    }
  };

  return (
    <div className={styles.container}>
  
      <main className={styles.main}>
        <div className={styles.logo}>
          <img className={styles.img} src={logo} alt="logo" />
        </div>
        <button className={styles.outline_btn}>
          <GoogleIcon /> continue with google
        </button>
        <button className={styles.outline_btn}>
          Continue with phone number
        </button>
        <p className={styles.or_container}>or</p>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className={styles.input_container}>
            <TextField
              label="Enter your email"
              placeholder="Enter your email"
              name="email"
              handleInputState={handleInputState}
              schema={schema.email}
              handleErrorState={handleErrorState}
              value={data.email}
              error={errors.email}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Password"
              placeholder="Password"
              name="password"
              handleInputState={handleInputState}
              schema={schema.password}
              handleErrorState={handleErrorState}
              value={data.password}
              error={errors.password}
              type="password"
              required={true}
            />
          </div>
          <p className={styles.forgot_password}>Forgot your password?</p>
          <div className={styles.form_bottom}>
            {/* <Checkbox label="Remember me" /> */}
            <Button
              type="submit"
              label="LOG IN"
              style={{ color: "white", background: "#15883e", width: "20rem" }}
            />
          </div>
        </form>
        <h1 className={styles.dont_have_account}>Don't have an account?</h1>
        <Link to="/signup">
          <button className={styles.outline_btn}>sign up</button>
        </Link>
      </main>
    </div>
  );
};

export default Login;
