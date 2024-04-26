import React, { createContext, useEffect, useState } from "react";



export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAll_Produc] = useState([]);
    
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
      fetch('http://localhost:4000/api/products/all')
      .then((response)=>response.json())
      .then((data)=>setAll_Produc(data))

      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/api/products/getcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));
      }
    },[])
    

    const addToCart = (itemId) => {
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/api/products/addtocart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
      }
    }

    const removeFromCart = (itemId) => {
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/api/products/removefromcart',{
          method:'POST',
          headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data))
      }
    }

    const updateCartItemQuantity = async (itemId, quantity) => {
      setCartItems((prev) => ({ ...prev, [itemId]: quantity }));
      if (localStorage.getItem('auth-token')) {
        try {
          const response = await fetch('http://localhost:4000/api/products/updatecartitemquantity', {
            method: 'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, quantity }),
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error updating cart item quantity:', error);
        }
      }
    };
    

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for(const items in cartItems)
      {
        if(cartItems[items]>0){
          let itemInfo = all_product.find((product)=>product.id===Number(items))
          totalAmount += itemInfo.new_price * cartItems[items];
        }
      }
      return totalAmount;
    }

    const getTotalCartItems = () =>{
      let totalItem = 0;
      for(const items in cartItems)
      {
        if(cartItems[items]>0){
          totalItem += cartItems[items];
        }
      }
      return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,updateCartItemQuantity};
    return (
        <ShopContext.Provider value={contextValue}>
          {props.children}  
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;