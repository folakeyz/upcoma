import React from "react";
import { Banner, Footer, Header, Navigation } from "../components";

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
