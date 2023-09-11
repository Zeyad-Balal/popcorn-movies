import Search from "./Search";
import Logo from "./Logo";

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      {children}
    </nav>
  ); //fix prop drilling with component composition
};
export default NavBar;
