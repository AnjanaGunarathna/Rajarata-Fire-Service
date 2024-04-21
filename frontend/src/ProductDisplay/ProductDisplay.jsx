import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // Check if product is undefined or null
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-img-main' src={product.image} alt="" />
                </div>
            </div>
            <div className="producdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">Rs.{product.old_price}</div>
                    <div className="productdisplay-right-prices-new">Rs.{product.new_price}</div>
                </div>
                <div className="productdisplay-right-discription">
                    {product.description}
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
            </div>
        </div>
    );
};

export default ProductDisplay;
