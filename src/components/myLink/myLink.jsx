import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./myLink.module.css";

export const MyLink = ({ name, link }) => {
  return (
    <li className={styles.nav_link_item}>
      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive && styles.active_link}`
        }
        to={link}
      >
        {name}
      </NavLink>
    </li>
  );
};

MyLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
