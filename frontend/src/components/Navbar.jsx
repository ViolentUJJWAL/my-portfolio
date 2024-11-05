// src/components/Navbar.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import "../assets/styles/navbar/style.css"

const Navbar = () => {
	const { isAuthenticated } = useAuth();
	const { activeTheme, activeBg } = useTheme();

	useEffect(() => {
		// Apply active theme to the root element
		const root = document.getElementsByClassName("navbar")[0];
		root.style.setProperty("--color", activeTheme.background);
		root.style.setProperty("--text", activeTheme.color);
		root.style.setProperty("--border", activeBg.color);
	}, [activeTheme, activeBg]);

	return (
		<nav className="navbar">
			<div className="mobile">
				<label className="mobile__label" htmlFor="checkbox">
					<div className="mobile__label__content">
						<span className="label__line"></span>
						<span className="label__line"></span>
					</div>
					<div className="mobile__label__content">
						<span className="label__line"></span>
						<span className="label__line"></span>
					</div>
					<div className="mobile__label__content">
						<span className="label__line"></span>
						<span className="label__line"></span>
					</div>
				</label>
				<input className="mobile__input" type="checkbox" id="checkbox" />
				<nav className="mobile__nav">
					<ul style={{"list-style-type": "none"}}>
						{
							(isAuthenticated)?
						<>
							<li className="nav__item"><Link className='link' to="/dashboard">Dashboard</Link></li>
							<li className="nav__item"><Link className='link' to="/add-data">Add Data</Link></li>
						</>:
						<>
							<li className="nav__item"><Link className='link' to="/login">Login</Link></li>
							<li className="nav__item"><Link className='link' to="/signup">Signup</Link></li>
						</>
			}
						<li className="nav__item"><Link className='link' to="/contactus">Contect Us</Link></li>
						<li className="nav__item"><Link className='link' to="#">About</Link></li>
					</ul>
				</nav>
			</div>
		</nav>
	);
};

export default Navbar;
