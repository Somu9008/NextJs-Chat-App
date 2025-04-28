import Navbar from "@/components/navbar";
import PopUp from "@/components/popUp";
import React from "react";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const userState = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "3.4rem" }}>
        {children}
        {userState.message != "" && <PopUp message={userState.message} />}
        <footer>Footer</footer>
      </div>
    </>
  );
}
