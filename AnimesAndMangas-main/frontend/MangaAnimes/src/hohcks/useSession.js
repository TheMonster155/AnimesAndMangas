import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../utiles/TokenExpired";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useSession hook caricato");

    const token = localStorage.getItem("Authorization");
    console.log("Token recuperato dal localStorage:", token);

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("Token decodificato:", decodedToken);

        if (isTokenExpired(decodedToken.exp)) {
          console.log("Token scaduto, rimozione dal localStorage");
          localStorage.removeItem("Authorization");
          setSessionData(null);
        } else {
          console.log("Token valido, impostazione sessionData");
          setSessionData(decodedToken);
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
      }
    } else {
      console.log("Nessun token trovato nel localStorage");
    }
  }, []);

  return sessionData;
};

export default useSession;
