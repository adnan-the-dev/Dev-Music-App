import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { postLoginApi } from "../../api/auth/authApi";
import showToast from "../../utils/toastService";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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
      const formData = {
        email: data.email,
        password: data.password,
      };
      try {
        const res = await postLoginApi(formData);
        console.log(res, "login response");
        if (res.status == 200) {
          showToast(`${res?.data?.message}`, "success");
          navigate("/home");
          // save the token in local storage
          localStorage.setItem("token", res?.data?.data);
        } else {
          showToast(`${res?.response?.data?.message}`, "error");
        }
      } catch (error) {
        showToast(
          "An error occurred while registering user. Please try again.",
          "error"
        );
      }
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
