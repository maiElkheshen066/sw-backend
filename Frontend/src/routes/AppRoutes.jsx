// routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/register';
import Menu from '../Pages/Menu';
import Profile from '../Pages/profile';
import Cart from '../Pages/cart';
import MainLayout from '../layouts/MainLayout';


const AppRoutes = () => (
  
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default AppRoutes;
