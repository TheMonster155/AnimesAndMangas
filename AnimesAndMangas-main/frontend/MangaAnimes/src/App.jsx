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
import Dashboard from "./pages/CreateProduts/Dashboard";
import WrappedOrderForm from "./components/WrappedOrderForm/WrappedOrderForm";
import DetailsProducts from "./components/DetailsProducts/DetailsProducts";

import MangaList from "./components/MangaList/MangaList";
import ContactPage from "./pages/ContactPage/ContactPage";
import MangaListPage from "./components/SellerProductCards/SellerProductCards";

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/cart" element={<WrappedOrderForm />} />
      <Route path="/mangacreate" element={<CreateManga />} />
      <Route path="/registationSeller" element={<SellerRegistration />} />
      <Route path="/registationUser" element={<UserRegistration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<SuccessGoogle />} />
      <Route exact path="/" element={<HomePage2 />} />
      <Route path="/details/:productType/:_id" element={<DetailsProducts />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/MangaList/:type" element={<MangaList />} />
      <Route path="/sellerpage" element={<MangaListPage />} />
    </Routes>
  );
};

export default App;
