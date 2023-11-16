import React from 'react'
import { Link, NavLink } from "react-router-dom";
const Menu = () => {
  return (
    <nav className="flex flex-row gap-5 justify-around items-center bg-orange-400 bg-opacity-80 backdrop-blur-md flex-wrap px-5 nav_container fixed top-0 w-full z-10 ">
			<div>
				<Link to={"/"}>logo</Link>
			</div>
			<ul className="flex gap-5">
				<li>
					<NavLink to={"/"}>Inicio</NavLink>
				</li>
				<li>
                    <NavLink to={"/Carrito"}>Carrito</NavLink>
                </li>
			</ul>
		</nav>
  )
}
export default Menu