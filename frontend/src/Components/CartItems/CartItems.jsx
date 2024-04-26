import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);

    const handleQuantityChange = (itemId, event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((product) => {
    const quantity = cartItems[product.id] || 0;
    if (quantity > 0) {
        return (
            <div key={product.id}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={product.image} alt="" className='carticon-product-icon' />
                    <p>{product.name}</p>
                    <p>Rs.{product.new_price || 0}</p> 
                    <input
                        type="number"
                        value={quantity}
                        onChange={(event) => handleQuantityChange(product.id, event)}
                        className='carditems-quantity'
                        min="0"
                    />
                    <p>Rs.{(product.new_price || 0) * quantity}</p> 
                    <img
                        className='carditem-remove-icon'
                        src={remove_icon}
                        onClick={() => { removeFromCart(product.id) }}
                        alt=""
                    />
                </div>
                <hr />
            </div>
        );
    }
    return null;
})}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-items">
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <h3>Total</h3>
                            <h3>Rs.{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
