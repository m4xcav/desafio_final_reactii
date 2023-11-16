import React, {useState} from 'react'
import { PizzaContext } from './PizzaContext'

const PizzaProvider = ({children}) => {
const [carrito, setCarrito] = useState({});
  return (
    <PizzaContext.Provider value={{carrito, setCarrito}}>
        {children}
    </PizzaContext.Provider>
  )
}

export default PizzaProvider