import React, { useContext, useState } from 'react';
import './CSS/Shop.css';
import shop_banner from '../Components/Assets/banner1.png';
import Item from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import { GrSearch } from 'react-icons/gr';

const Shop = () => {
  const { all_product } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
  
    setTimeout(() => {
    
      const filtered = all_product.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setLoading(false);
    }, 800); 
  };

  // Reset search and display all products when search query is empty
  const resetSearch = () => {
    setSearchQuery('');
    setFilteredProducts([]);
  };

  return (
    <div className="shop-cat">
      <img className="shop_banner" src={shop_banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-search">
          <input
            type="text"
            placeholder="search product here..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div className="iconsearch" onClick={searchQuery ? handleSearch : resetSearch}>
            <GrSearch />
          </div>
        </div>
      </div>
      <div className="shopcategory-product">
        {loading ? (
          <div className="loading-screen">
            <div className="loader"></div>
          </div>
        ) : searchQuery && filteredProducts.length > 0 ? (
          // Display filtered products
          filteredProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          // Display all products when search query is empty
          all_product.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        )}
      </div>
      <div className="shopcategory-loardmore">Explore More</div>
    </div>
  );
};

export default Shop;
