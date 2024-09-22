import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "../../Components/Inputs/TextFeilds";
import Select from "../../Components/Inputs/Select";
import Radio from "../../Components/Inputs/Radio";
import Button from "../../Components/Button";
import logo from "../../assets/logo.png";
import styles from "./styles.module.scss";
import showToast from "../../utils/toastService";
import { postRegisterApi } from "../../api/auth/authApi";

const months = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "Apirl", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "Augest", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

const genders = ["male", "female", "non-binary"];

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    month: "",
    date: "",
    year: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      month: data.month,
      date: data.date,
      year: data.year,
      gender: data.gender,
    };
    try {
      const res = await postRegisterApi(formData);
      if (res.status == 200) {
        showToast(`${res?.data?.message}`, "success");
      } else {
        showToast(`${res?.response?.data?.message}`, "error");
      }
    } catch (error) {
      showToast(
        "An error occurred while registering user. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.img} src={logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h2 className={styles.form_heading}>
            Sign up with your email address
          </h2>
          <div className={styles.input_container}>
            <TextField
              label="Profile Name"
              placeholder="Enter a profile name"
              name="name"
              handleInputState={handleInputState}
              value={data.name}
              error={errors.name}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Enter your email"
              placeholder="Enter your email"
              name="email"
              handleInputState={handleInputState}
              value={data.email}
              error={errors.email}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Create a password"
              placeholder="Create a password"
              name="password"
              handleInputState={handleInputState}
              value={data.password}
              error={errors.password}
              type="password"
              required={true}
            />
          </div>

          <div className={styles.date_of_birth_container}>
            <p>What's your date of birth?</p>
            <div className={styles.date_of_birth}>
              <div className={styles.month}>
                <Select
                  name="month"
                  handleInputState={handleInputState}
                  label="Month"
                  placeholder="Months"
                  options={months}
                  value={data.month}
                  required={true}
                />
              </div>
              <div className={styles.date}>
                <TextField
                  label="Date"
                  placeholder="DD"
                  name="date"
                  value={data.date}
                  handleInputState={handleInputState}
                  required={true}
                />
              </div>
              <div className={styles.year}>
                <TextField
                  label="Year"
                  placeholder="YYYY"
                  name="year"
                  value={data.year}
                  handleInputState={handleInputState}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className={styles.input_container}>
            <Radio
              label="What's your gender?"
              name="gender"
              handleInputState={handleInputState}
              options={genders}
              required={true}
            />
          </div>
          <div className={styles.submit_btn_wrapper}>
            <Button label="Sign Up" type="submit" />
          </div>
          <p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
            Have an account? <Link to="/login"> Log in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
