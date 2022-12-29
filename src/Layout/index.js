import React from "react";
import { Banner, Footer, Header, Navigation } from "../components";

const Layout = ({ page, children }) => {
  return (
    <div className="appContainer">
      <Navigation />
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
