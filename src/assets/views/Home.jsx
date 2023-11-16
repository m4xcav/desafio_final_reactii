import { useState, useEffect } from "react";
import PizzaCard from '../components/PizzaCard';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  const url = 'src/assets/api/pizzas.json';

  const getPizzas = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <>
      <div className='banner text-center h-80 flex flex-col justify-center items-center text-white'>
        <h1 className="text-6xl font-bold">Pizzeria Mamma Mia!!</h1>
        <p className="text-xl mt-4">Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
      <PizzaCard pizzas={pizzas} />
    </>
  );
}

export default Home;
