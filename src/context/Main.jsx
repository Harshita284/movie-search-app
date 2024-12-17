import React,{createContext, useEffect, useState} from 'react'
const Context = createContext();

export default function Main(props) {

      const [cart, setcart] = useState([]);

      const addtoCart = (product_id) =>{
           if(cart.includes(product_id)) return;
            setcart([...cart,product_id])
      }

      useEffect(
            () =>{

                  if(cart.length == 0) return;
                  localStorage.setItem("cart", JSON.stringify(cart));
            },[cart]
      )

      useEffect(() => {
        
            const lscart = localStorage.getItem("cart");
            if(lscart){
                  setcart(JSON.parse(lscart));
            }
      
        
      }, [])
      

  return (
    <>
    <Context.Provider value=
    {
      {
            cart , addtoCart
      }
    }>


    {props.children}
    </Context.Provider>
      
    </>
  )
}

export {Context} ;