import React, { useEffect, useState } from 'react'
import './NewItems.css'
import Item from '../Item/Item'

const NewItems = () => {

  const[new_collections,setMew_collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newitems')
    .then((Response)=>Response.json())
    .then((data)=>setMew_collection(data));
  },[])

  return (
    <div className='newitems'>
        <h1>NEW PRODUCTS</h1>
        <hr/>
        <div className="collections">
            {new_collections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}

        </div>
      
    </div>
  )
}

export default NewItems
