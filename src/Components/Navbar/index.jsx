import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.icon} onClick={() => navigate(-1)}>
          <ArrowBackIosRoundedIcon />
        </div>
        <div className={styles.icon} onClick={() => navigate(-1)}>
          <ArrowForwardIosRoundedIcon />
        </div>
      </div>
      <div className={styles.right}>
        <div
          style={{ backgroundColor: `${menu ? "#282828" : "#000"}` }}
          className={styles.profile_menu}
          onClick={() => setMenu(!menu)}
        >
          <AccountCircleIcon />
          <p>{userInfo?.name || "Not loging"}</p>
          {/* <p>Not loging</p> */}
          {menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </div>
      {menu && (
        <ClickAwayListener onClickAway={() => setMenu(false)}>
          <div className={styles.menu} onClick={() => setMenu(false)}>
            <Link to="/me">
              <div className={styles.options}>
                <p>Profile</p>
                <PersonIcon />
              </div>
            </Link>
            <div className={styles.options}>
              <p>Settings</p>
              <SettingsIcon />
            </div>
            <div className={styles.options} onClick={handleLogOut}>
              <p>Logout</p>
              <LogoutIcon />
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Navbar;
