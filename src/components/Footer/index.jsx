import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.col}>
        <div className={styles.logo}>
          <img src={logo} alt="Upcoma Logo" />
        </div>
        <div className={styles.title}>Follow Us</div>
        <div className={styles.icons}>
          <a href="https://facebook.com">
            <FaFacebook />
          </a>
          <a href="https://instagram.com">
            <FaInstagram />
          </a>
          <a href="https://twitter.com">
            <FaTwitter />
          </a>
        </div>

        <span>&copy; Copyright Upcoma</span>
      </div>
      <div className={styles.col}>
        <div className={styles.title}>Browse</div>
        <div className={styles.list}>
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Top Songs</Link>
          <Link to="/">Top Artists</Link>
          <Link to="/">Book Artist</Link>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.title}>Contact Us</div>
        <div className={styles.list}>
          <a href="mailTo:support@upcoma.com">support@upcoma.com</a>
          <a href="tel:+2348058463103">+2348058463103</a>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.title}>About Us</div>
        <div className={styles.list}>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Report a Vulnerabilty</Link>
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.title}>Resources</div>
        <div className={styles.list}>
          <Link to="/">Copyright Trademark</Link>
          <Link to="/">Legal</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
