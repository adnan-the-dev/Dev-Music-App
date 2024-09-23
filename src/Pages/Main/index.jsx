import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../images/white_logo.svg";
import record from "../../images/record.svg";
import recordArm from "../../images/record-arm.svg";
import styles from "./styles.module.scss";

const navLinks = [
  { name: "Premium", link: "#" },
  { name: "Support", link: "#" },
  { name: "Download", link: "#" },
  { name: "Sign up", link: "/signup" },
  { name: "Log in", link: "/login" },
];

const companyLInks = ["About", "Jobs", "For the record"];

const communitiesLinks = [
  "For Artists",
  "Developers",
  "Advertising",
  "Investors",
  "Vendors",
];

const usefulLInks = ["Support", "Web Player", "Free Mobile App"];

const footerLinks = [
  "legal",
  "privacy center",
  "privacy policy",
  "Cookies",
  "About ads",
  "Additional CA Privacy Disclosures",
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main_container}>
        <div className={styles.main}>
          <h1>Wellcome To Dev Music</h1>
          <div className={styles.image_container}>
            <div className={styles.right}>
              <img src={record} alt="record" className={styles.record} />
              <img
                src={recordArm}
                alt="record-arm"
                className={styles.record_arm}
              />
            </div>
            <Link to="/signup">
              <button className={styles.button_86} role="button">
                Get Started
              </button>
            </Link>
            <div className={styles.right}>
              <img src={record} alt="record" className={styles.record} />
              <img
                src={recordArm}
                alt="record-arm"
                className={styles.record_arm}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
