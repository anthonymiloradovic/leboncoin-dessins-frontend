import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favorite from '../pages/Favorite';
import FavoriteDetails from '../pages/FavoriteDetails';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import NewArt from '../pages/NewArt';

import Register from '../components/Forms/Register';
import Login from '../components/Forms/Login';
import Logout from '../components/Forms/Logout';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilteredListPage from '../pages/FilteredListPage';



const IndexRoutes = () => {
  return (
    <BrowserRouter>
    <Navbar /> 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/favorites/:id" element={<FavoriteDetails />} />
             <Route path="/new-art" element={<NewArt />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
             <Route path="/logout" element={<Logout />} />




            < Route path="/filtered-list" element={<FilteredListPage />} />

             <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
    </BrowserRouter>

  );
}

export default IndexRoutes;
