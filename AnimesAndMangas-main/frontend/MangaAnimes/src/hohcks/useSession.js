import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../utiles/TokenExpired";

const useSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (token) {
      try {
        const decodedToken = jwt_decode(token);

        if (isTokenExpired(decodedToken.exp)) {
          localStorage.removeItem("Authorization");
          setSessionData(null);
        } else {
          setSessionData(decodedToken);
        }
      } catch (error) {
        setSessionData(null);
      }
    } else {
    }
  }, []);

  return sessionData;
};

export default useSession;
