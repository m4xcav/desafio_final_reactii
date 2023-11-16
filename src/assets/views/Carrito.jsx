import React, { useContext, useEffect, useState } from "react";
import { PizzaContext } from '../context/PizzaContext';

const Carrito = () => {
  const { carrito, total, setTotal } = useContext(PizzaContext);
  const [detallesCarrito, setDetallesCarrito] = useState([]);

  const obtenerDetallesCarrito = async () => {
    const detalles = await Promise.all(
      carrito.map(async (pizzaId) => {
        const res = await fetch('/src/assets/api/pizzas.json'); 
        const data = await res.json();
        const pizzaDetalle = data.find((pizza) => pizza.id === pizzaId);
        return { ...pizzaDetalle, cantidad: 1, precio: pizzaDetalle.price };
      })
    );

    // Consolidar detalles por ID
    const detallesConsolidados = detalles.reduce((acumulado, pizza) => {
      const pizzaExistente = acumulado.find((p) => p.id === pizza.id);

      if (pizzaExistente) {
        pizzaExistente.cantidad += 1;
        pizzaExistente.precio += pizza.price;
      } else {
        acumulado.push(pizza);
      }

      return acumulado;
    }, []);

    setDetallesCarrito(detallesConsolidados);
  };

  // Función para incrementar la cantidad de una pizza en el carrito
  const incrementarCantidad = (pizzaId) => {
    const nuevosDetalles = detallesCarrito.map((pizza) => {
      if (pizza.id === pizzaId) {
        const nuevaCantidad = pizza.cantidad + 1;
        const nuevoPrecio = pizza.price * nuevaCantidad;
        return { ...pizza, cantidad: nuevaCantidad, precio: nuevoPrecio };
      }
      return pizza;
    });

    setDetallesCarrito(nuevosDetalles);
    actualizarTotal(nuevosDetalles);
  };

// Función para decrementar la cantidad de una pizza en el carrito
const decrementarCantidad = (pizzaId) => {
  const pizzaDetalle = detallesCarrito.find((pizza) => pizza.id === pizzaId);

  if (pizzaDetalle) {
    let confirmacion = true;

    // Verificar si la cantidad es 1 para mostrar el cuadro de diálogo
    if (pizzaDetalle.cantidad === 1) {
      confirmacion = window.confirm(`¿Desea eliminar la pizza ${pizzaDetalle.name} de la lista?`);
    }

    if (confirmacion) {
      const nuevosDetalles = detallesCarrito
        .map((pizza) => {
          if (pizza.id === pizzaId && pizza.cantidad > 1) {
            const nuevaCantidad = pizza.cantidad - 1;
            const nuevoPrecio = pizza.price * nuevaCantidad;
            return { ...pizza, cantidad: nuevaCantidad, precio: nuevoPrecio };
          }
          return pizza;
        })
        .filter((pizza) => pizza.cantidad > 0);
        
      setDetallesCarrito((prevDetalles) => [...nuevosDetalles]);
      actualizarTotal(nuevosDetalles);
    }
  }
};

  // Función para actualizar el total global del context
  const actualizarTotal = (detalles) => {
    const nuevoTotal = detalles.reduce((acumulado, pizza) => acumulado + pizza.precio, 0);
    setTotal(nuevoTotal);
  };

  useEffect(() => {
    obtenerDetallesCarrito();
  }, [carrito]);

  const totalFormateado = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  return (
    <>
    <h2 className="text-center my-8 text-5xl font-bold">Detalles del Pedido:</h2>
    <div className="container mx-auto min-h-fit mt-12 py-3 flex flex-wrap justify-center">
      <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400">
        <thead className="text-xs text-black-700 uppercase bg-black-50 dark:bg-black-700 dark:text-black-400">
          <tr>
            <th>Pizza</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {detallesCarrito.map((pizzaDetalle) => (
            <tr key={pizzaDetalle.id} className="bg-white border-b">
              <td className="px-6 py-4 flex"><img src={pizzaDetalle.img} alt={`pizza ${pizzaDetalle.id}`} className="w-12 h-12 mr-4" />
                  <span>{pizzaDetalle.name}</span></td>
              <td>${pizzaDetalle.precio}</td>
              <td>
                <button onClick={() => decrementarCantidad(pizzaDetalle.id)} className='btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>-</button>
                {pizzaDetalle.cantidad}
                <button onClick={() => incrementarCantidad(pizzaDetalle.id)} className='btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <h2 className="text-center my-8 text-5xl font-bold">Total: {totalFormateado}</h2>
    </>
    
  );
}

export default Carrito;
