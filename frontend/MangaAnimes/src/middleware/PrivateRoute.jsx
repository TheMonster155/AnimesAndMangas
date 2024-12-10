// src/middleware/PrivateRoute.jsx
import HomePage from "../components/Homepage2/HomePage2";

import { Outlet } from "react-router-dom";

export const isAuth = () => {
  return JSON.parse(localStorage.getItem("Authorization"));
};

const ProtectedRoutes = () => {
  const isAuthorized = isAuth();

  return isAuthorized ? <Outlet /> : <HomePage />;
};

export default ProtectedRoutes;
