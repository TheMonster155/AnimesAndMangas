import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Stato per il nome dell'utente
  const navigate = useNavigate();
  const location = useLocation();

  // Controlla se l'utente è loggato al caricamento del componente
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsLoggedIn(true);
      // Decodifica il token per ottenere il username dell'utente
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userNameFromToken = decodedToken.username || "Utente"; // Usa "Utente" come fallback
      setUserName(userNameFromToken); // Imposta il nome dell'utente
    }
  }, []);

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Email e password sono obbligatori.");
      return false;
    }
    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("Authorization", data.token);
        setIsLoggedIn(true);
        setFormData({ email: "", password: "" }); // Resetta il form
        const decodedToken = JSON.parse(atob(data.token.split(".")[1])); // Decodifica il token appena ricevuto
        const userNameFromToken = decodedToken.username || "Utente"; // Usa un fallback se il username non è presente
        setUserName(userNameFromToken); // Imposta il nome dell'utente
        if (onLogin) onLogin(data);
        if (handleCloseLogin) handleCloseLogin();
        navigate(location.state?.from || "/", { replace: true });
      } else {
        setErrorMessage(data.message || "Email o password errati.");
      }
    } catch (error) {
      setErrorMessage("Errore di rete. Riprova più tardi.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    setIsLoggedIn(false); // Segna l'utente come non loggato
    setUserName(""); // Resetta il nome dell'utente
    navigate("/", { replace: true });
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}

        {!isLoggedIn ? (
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                onChange={handlerInput}
                value={formData.email}
                required
                autoComplete="email"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Inserisci la tua password"
                onChange={handlerInput}
                value={formData.password}
                required
                autoComplete="current-password"
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            <div className="text-center mt-3">
              <p>
                Non hai un account?{" "}
                <a
                  href="/registationUser"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Registrati qui
                </a>
              </p>
              <p>
                O accedi con{" "}
                <button
                  type="button"
                  onClick={redirectToGoogle}
                  style={{
                    background: "#db4437",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Google
                </button>
              </p>
            </div>
          </Form>
        ) : (
          <div className="text-center">
            <p>Benvenuto, {userName}!</p> {/* Mostra il nome dell'utente */}
            <Button
              variant="secondary"
              className="w-100"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Login;

/*import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap"; // Bootstrap import, ma il pulsante Google non lo userà

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Controlla se l'utente è loggato al caricamento del componente
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Email e password sono obbligatori.");
      return false;
    }
    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("Authorization", data.token);
        setIsLoggedIn(true);
        setFormData({ email: "", password: "" }); // Resetta il form
        if (onLogin) onLogin(data);
        if (handleCloseLogin) handleCloseLogin();
        navigate(location.state?.from || "/", { replace: true });
      } else {
        setErrorMessage(data.message || "Email o password errati.");
      }
    } catch (error) {
      setErrorMessage("Errore di rete. Riprova più tardi.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    setIsLoggedIn(false); // Segna l'utente come non loggato
    navigate("/", { replace: true });
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}

        {!isLoggedIn ? (
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                onChange={handlerInput}
                value={formData.email}
                required
                autoComplete="email"
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Inserisci la tua password"
                onChange={handlerInput}
                value={formData.password}
                required
                autoComplete="current-password"
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            <div className="text-center mt-3">
              <p>
                Non hai un account?{" "}
                <a
                  href="/registationUser"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Registrati qui
                </a>
              </p>
              <p>
                O accedi con{" "}
                <button
                  type="button"
                  onClick={redirectToGoogle}
                  style={{
                    background: "#db4437",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Google
                </button>
              </p>
            </div>
          </Form>
        ) : (
          <div className="text-center">
            <p>Sei loggato!</p>
            <Button
              variant="secondary"
              className="w-100"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Login;*/
