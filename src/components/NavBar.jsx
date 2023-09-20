import Logo from "./Logo";
/* import { useState } from "react"; */

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {/*  <Search query={query} setQuery={setQuery} /> */}
      {children}
    </nav>
  ); //fix prop drilling with component composition
};
export default NavBar;
