import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { PizzaContext } from '../context/PizzaContext';

const PizzaCard = (props) => {
  const { pizzas } = props;
  const { carrito, setCarrito, total, setTotal } = useContext(PizzaContext);

  const agregarAlCarrito = (pizza) => {
    const nuevoCarrito = [...carrito, pizza.id];
    const nuevoTotal = total + pizza.price;
    setCarrito(nuevoCarrito);
    setTotal(nuevoTotal);
  };

  return (
    <div>
      <h2 className="text-center my-8 text-5xl font-bold">Elige tus Pizzas</h2>
      <div className="container mx-auto gap-5 pizzas-home">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="border border-gray-300" style={{ width: "19rem" }}>
            <img src={pizza.img} alt={`pizza ${pizza.id}`} />
            <div className="p-3">
              <div>
                <h1 className="text-2xl font-bold border-b-2">{pizza.name.toUpperCase()}</h1>
              </div>
              <h3 className="text-lg font-medium mt-3">Ingredientes:</h3>
              <ul className="ml-4">
                {pizza.ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">{ingredient}</li>
                ))}
              </ul>
              <p className="text-center text-2xl font-bold border-t-2 m-3">{`$ ${pizza.price}`}</p>
              <div className="flex justify-around card-body">
                <Link to={`/Pizza/${pizza.id}`} className="card-link btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Ver mas
                </Link>
                <button onClick={() => agregarAlCarrito(pizza)} className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Añadir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaCard;
