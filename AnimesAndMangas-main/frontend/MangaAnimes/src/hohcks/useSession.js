/*// src/hooks/useSession.js
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { isAuth } from "../middleware/PrivateRoute"; // Importa la funzione isAuth
import { isTokenExpired } from "../utiles/TokenExpired";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = isAuth(); // Usa la funzione isAuth per ottenere il token
    if (session) {
      try {
        const decodedSession = jwt_decode(session);
        if (isTokenExpired(decodedSession.exp)) {
          setSessionData(null);
          navigate("/");
        } else {
          setSessionData(decodedSession);
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
        navigate("/");
      }
    } else {
      setSessionData(null);
      navigate("/");
    }
  }, [navigate]);

  return sessionData;
};

export default useSession;
*/
// src/hooks/useSession.js
/*
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode"; // Modifica qui l'importazione

import { useEffect, useState } from "react";
import { isAuth } from "../middleware/PrivateRoute"; // Importa la funzione isAuth
import { isTokenExpired } from "../utiles/TokenExpired";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = isAuth(); // Usa la funzione isAuth per ottenere il token
    if (session) {
      try {
        const decodedSession = jwt_decode(session);
        if (isTokenExpired(decodedSession.exp)) {
          setSessionData(null);
          navigate("/");
        } else {
          setSessionData(decodedSession);
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
        navigate("/");
      }
    } else {
      setSessionData(null);
      navigate("/");
    }
  }, [navigate]);

  return sessionData;
};

export default useSession; // Assicurati che sia una esportazione predefinita
*/
/*
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useEffect, useState } from "react";
import { isAuth } from "../middleware/PrivateRoute";
import { isTokenExpired } from "../utiles/TokenExpired";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  console.log(sessionData);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Sessione trovata:", token);
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("Token decodificato:", decodedToken);
        if (isTokenExpired(decodedToken.exp)) {
          console.log("Token scaduto");
          setSessionData(null);
          localStorage.removeItem("token");
        } else {
          console.log("Token valido");
          setSessionData(decodedToken);
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
      }
    } else {
      console.log("Nessuna sessione trovata");
      setSessionData(null);
    }
  }, []);

  return sessionData;
};

export default useSession;
*/
//sopra utlimo

/*
 useEffect(() => {
    const session = isAuth();
    if (session) {
      try {
        const decodedSession = jwt_decode(session);
        if (isTokenExpired(decodedSession.exp)) {
          setSessionData(null);
          navigate("/");
        } else {
          setSessionData(decodedSession);
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
        navigate("/");
      }
    } else {
      setSessionData(null);
      navigate("/");
    }
  }, [navigate]);

  return sessionData;
};
*/
// useSession.js
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../utiles/TokenExpired";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        if (isTokenExpired(decodedToken.exp)) {
          localStorage.removeItem("token"); // Rimuovi il token se scaduto
          setSessionData(null);
        } else {
          setSessionData(decodedToken);
        }
      } catch (error) {
        console.error("Errore nel decoding del token:", error);
        setSessionData(null);
      }
    }
  }, []);

  return sessionData;
};

export default useSession;
