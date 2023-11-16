import React, {useState} from 'react'
import { PizzaContext } from './PizzaContext'

const PizzaProvider = ({children}) => {
const [carrito, setCarrito] = useState([]);
const [total, setTotal] = useState(0);
  return (
    <PizzaContext.Provider value={{carrito, setCarrito, total, setTotal}}>
        {children}
    </PizzaContext.Provider>
  )
}

export default PizzaProvider