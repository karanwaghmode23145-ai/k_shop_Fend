import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import HeaderMiddle from "../headerMiddle/HeaderMiddle";
import HeaderMenu from "../header_menu/HeaderMenu";



const Header = () => {
  // 🟢 SAFE SELECTOR — fallback [] so reduce kabhi error nahi dega
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <>
      {/* Middle + Menu */}
      <HeaderMiddle cartCount={cartCount} />
      <HeaderMenu />
    </>
  );
};

export default Header;
