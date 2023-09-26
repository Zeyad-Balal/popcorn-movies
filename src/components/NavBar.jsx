import Logo from './Logo';
/* import { useState } from "react"; */

const NavBar = ({ children }) => {
	return (
		<nav className='nav-bar'>
			{/*  <Search query={query} setQuery={setQuery} /> */}
			{children}
			<Logo />
		</nav>
	); //fix prop drilling with component composition
};
export default NavBar;
