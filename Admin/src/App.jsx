import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './Components/Footer/Footer';
import Listproduct from './Components/Listproduct/Listproduct';
import Addproduct from './Components/Addproduct/Addproduct';
import Updateproduct from './Components/Updateproduct/Updateproduct';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
  
      <div>
       
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productmanagement" element={<Listproduct />} />
          <Route path="/listproduct" element={<Listproduct />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/updateproduct" element={<Updateproduct />} />
        </Routes>
        <Footer />
      </div>

  );
};

export default App;
