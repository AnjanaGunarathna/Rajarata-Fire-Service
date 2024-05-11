import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://localhost:4000/api/products/all')
      .then((response) => response.json())
      .then((data) => setAllProducts(data));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/api/products/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

// Update product quantity
const updateProductQuantity = async (itemId, quantityDiff) => {
  try {
    const response = await fetch(`http://localhost:4000/api/products/update/${itemId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: -quantityDiff }), // Reduce the quantity by the selected amount
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error updating product quantity:', error);
  }
};

  

const addToCart = async (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

  if (localStorage.getItem('auth-token')) {
    try {
      const response = await fetch('http://localhost:4000/api/products/addtocart', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Rollback quantity if there's an error
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  } else {
    console.error('User not authenticated.');
  }
};

  
const removeFromCart = async (itemId) => {
  if (cartItems[itemId] > 0) {
    try {
      const response = await fetch('http://localhost:4000/api/products/removefromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ itemId: itemId }), // Corrected the body format
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 })); // Decrease the quantity by 1 in the cart

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }
};




const updateCartItemQuantity = async (itemId, quantity) => {
  const prevQuantity = cartItems[itemId] || 0;
  const quantityDiff = quantity - prevQuantity;

  setCartItems((prev) => ({ ...prev, [itemId]: quantity }));

  if (localStorage.getItem('auth-token')) {
    try {
      const response = await fetch('http://localhost:4000/api/products/updatecartitemquantity', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      // Revert cart quantity if there's an error
      setCartItems((prev) => ({ ...prev, [itemId]: prevQuantity }));
    }
  }
};

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(itemId));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalItem += cartItems[items];
      }
    }
    return totalItem;
  };

  const contextValue = { updateProductQuantity,getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, updateCartItemQuantity };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
  