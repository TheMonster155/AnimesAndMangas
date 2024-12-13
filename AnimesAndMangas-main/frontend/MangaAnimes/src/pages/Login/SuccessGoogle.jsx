import { useEffect } from "react";
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
    } else {
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Ti sei logato</h1>
    </div>
  );
};

export default SuccessGoogle;
