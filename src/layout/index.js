import React from "react";
import { Navigation, Header, Banner, Footer } from "../components";

const Layout = ({ name = "", children }) => {
  return (
    <div className="appContainer">
      <Navigation name={name} />
      <div className="contentsRight">
        <Header />
        <Banner />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
