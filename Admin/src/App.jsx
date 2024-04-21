import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Listproduct from './Components/Listproduct/Listproduct';
import Addproduct from './Components/Addproduct/Addproduct';
import Updateproduct from './Components/Updateproduct/Updateproduct';

const App = () => {
  return (
  
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Listproduct />} />
          <Route path="/listproduct" element={<Listproduct />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/updateproduct" element={<Updateproduct />} />
        </Routes>
        <Footer />
      </div>

  );
};

export default App;
