import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SingUp from "./Pages/SingUp";
import AdminHome from "./Pages/AdminHome";
import AdminUsers from "./Pages/AdminUsers";
import AdminOrders from "./Pages/AdminOrders";
import AdminRegistration from "./Pages/AdminRegistration";
import AdminInventory from "./Pages/AdminInventory";
import AdminProfile from "./Pages/AdminProfile";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SingUp />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/registration" element={<AdminRegistration />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
    </BrowserRouter>
);

export default Router;