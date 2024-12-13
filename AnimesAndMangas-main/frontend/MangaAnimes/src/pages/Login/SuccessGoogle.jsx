/*import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Ti sei logato</h1>
    </div>
  );
};

export default SuccessGoogle;
*/
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessGoogle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Componente SuccessGoogle caricato");
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    console.log("Parametro token:", token);

    if (token) {
      console.log("Salvataggio del token nel localStorage");
      localStorage.setItem("Authorization", JSON.stringify(token));

      setTimeout(() => {
        console.log("Navigazione alla home page...");
        navigate("/");
      }, 2000);
    } else {
      console.log("Token non presente nell'URL");
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Ti sei logato</h1>
    </div>
  );
};

export default SuccessGoogle;
