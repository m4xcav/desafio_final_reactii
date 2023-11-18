import React, { useContext } from "react";
import { PizzaContext } from '../context/PizzaContext';
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
const Menu = () => {
	const {total} = useContext(PizzaContext);
	const totalFormateado = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  return (
    <nav className="flex flex-row gap-5 justify-around items-center text-white bg-blue-400 bg-opacity-80 backdrop-blur-md flex-wrap px-5 nav_container fixed top-0 w-full z-10 ">
			<div>
				<Link to={"/"}><FontAwesomeIcon icon={faPizzaSlice} style={{color: "#ea9534",}} />Pizzeria Mamma Mia!</Link>
			</div>
			<ul className="flex gap-5">
				<li>
					<NavLink to={"/"}>Inicio</NavLink>
				</li>
				<li>
                    <NavLink to={"/Carrito"}><FontAwesomeIcon icon={faCartShopping} style={{color: "#6b5252",}} /> Total:{totalFormateado}</NavLink>
                </li>
			</ul>
		</nav>
  )
}
export default Menu