import HomePage from "../components/Homepage2/HomePage2";
import { Outlet, useLocation } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPages/NotFoundPages";
export const isAuth = () => {
  const token = localStorage.getItem("Authorization");
  const location = useLocation();
  if (token && token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (
        location.pathname.startsWith("/dashboard") &&
        payload.role !== "seller"
      ) {
        return <NotFoundPage />;
      }

      return payload ? true : false;
    } catch (error) {
      console.error("Errore nella decodifica del token JWT:", error);
      return false;
    }
  }

  return false;
};

const ProtectedRoutes = () => {
  const isAuthorized = isAuth();

  return isAuthorized ? <Outlet /> : <HomePage />;
};

export default ProtectedRoutes;
