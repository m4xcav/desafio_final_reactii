import React, { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PizzaContext } from '../context/PizzaContext';

const Pizza = () => {

  const { id } = useParams();
  const [pizzaDetalle, setPizzaDetalle] = useState(null);
  const URL = "/src/assets/api/pizzas.json";
  useEffect(() => {
    const fetchPizzaById = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        const selectedPizza = data.find((p) => p.id === id);
        setPizzaDetalle(selectedPizza);
      } catch (error) {
        console.error('Error fetching pizza by id:', error);
      }
    };

    fetchPizzaById();
  }, [id]);

  if (!pizzaDetalle) {
    return <p>Cargando...</p>;
  }

  const { name, desc, ingredients, price, img } = pizzaDetalle;
  const { carrito, setCarrito, total, setTotal } = useContext(PizzaContext);

  const agregarAlCarrito = (price, id) => {
    const nuevoCarrito = [...carrito, id];
    const nuevoTotal = total + price;
    setCarrito(nuevoCarrito);
    setTotal(nuevoTotal);
  };


  return (
    <div className="container mx-auto min-h-fit mt-12 py-3 flex flex-wrap justify-center">
      <img src={img} className="border border-slate-400 w-96" alt={`pizza ${id}`} />
      <div className="flex flex-col px-3 py-3 justify-between w-96 gap-3 border rounded-tr-lg rounded-br-lg border-slate-400">
        <h1 className="text-2xl font-medium">{name.toUpperCase()}</h1>
        <p>{desc}</p>
        <ul className="">
          <h3 className="text-xl font-bold">Ingredientes:</h3>
          {ingredients.map((ingredient, index) => (
            <li key={index} className="">{ingredient}</li>
          ))}
        </ul>
        <div className="flex justify-between">
          <p className="font-bold text-2xl"> Precio: {`$${price}`}</p>
         <button onClick={() => agregarAlCarrito(price, id)} className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Añadir</button>
          <Link to="/" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Regresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pizza;

