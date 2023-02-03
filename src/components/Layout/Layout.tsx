import React, { Component } from "react";
import AuthModal from "../Modal/Auth/AuthModal";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <AuthModal />
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;
