import './App.css'
import NavBar from './components/NavBar'
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import User from './pages/user';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaginationProvider from './contexts/PaginationContext';
import RequireAuth from './components/RequireAuth'
import SuccessPage from './pages/Success';
import Bookings from './pages/bookings/Bookings';

function App() {
  return (
    <PaginationProvider>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}>
        </Route>
        <Route element={<RequireAuth></RequireAuth>}>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Route>
        <Route
          path="/product/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/user" element={<User></User>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/order-success" element={<SuccessPage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </PaginationProvider>
  );
}

export default App
