import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage2 from "./components/Homepage2/HomePage2";
import Login from "./pages/Login/Login";
import SuccessGoogle from "./pages/Login/SuccessGoogle";

import SellerRegistration from "./pages/Register/RegisterSeller";
import UserRegistration from "./pages/Register/RegisterUser";
import CreateManga from "./pages/MangaCreate/MangaCreate";
import PrivateRoute from "./middleware/PrivateRoute";
import Dashboard from "./pages/Dashbord/Dashboard";
import WrappedOrderForm from "./components/WrappedOrderForm/WrappedOrderForm";
import DetailsProducts from "./components/DetailsProducts/DetailsProducts";

import MangaList from "./components/MangaList/MangaList";
import ContactPage from "./pages/ContactPage/ContactPage";

import NotFoundPage from "./components/NotFoundPage/notfoundpage";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage2 />} />
      <Route element={<PrivateRoute />}>
        <Route path="/cart" element={<WrappedOrderForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/mangacreate" element={<CreateManga />} />
      <Route path="/registationSeller" element={<SellerRegistration />} />
      <Route path="/registationUser" element={<UserRegistration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<SuccessGoogle />} />

      <Route path="/details/:productType/:_id" element={<DetailsProducts />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/MangaList/:type" element={<MangaList />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
