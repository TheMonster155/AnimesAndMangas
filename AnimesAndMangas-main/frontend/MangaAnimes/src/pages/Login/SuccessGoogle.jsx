import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessGoogle.css";

const SuccessGoogle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("Authorization", JSON.stringify(token));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
    }
  }, [location, navigate]);

  return (
    <div className="success-container">
      <h1 className="success-title">Login Success!</h1>
      <p className="success-message">
        Benvenuto! Il tuo accesso con Google è stato completato con successo.
        Verrai reindirizzato alla pagina principale tra pochi istanti.
      </p>
    </div>
  );
};

export default SuccessGoogle;
