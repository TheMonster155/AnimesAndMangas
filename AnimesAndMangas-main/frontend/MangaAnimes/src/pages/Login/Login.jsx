import { useState, useEffect } from "react";
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

export default Login;

/*import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Controlla se l'utente è loggato al caricamento del componente
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        localStorage.setItem("token", data.token);
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
    localStorage.removeItem("token");
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

export default Login;
/*

























/*import { useState } from "react"; ultimo
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        localStorage.setItem("token", data.token);
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
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handlerInput}
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
          </div>
          <div className="text-center mt-3">
            <Button
              variant="secondary"
              className="w-100"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/

/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        localStorage.setItem("token", data.token);
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

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handlerInput}
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
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/
/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Usa la funzione login dal contesto

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
        login(data.token); // Salva il token nel contesto
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

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handlerInput}
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
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/
/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "./AuthContext"; // Importa il contesto

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, authData } = useAuth(); // Usa il contesto per ottenere la funzione login e logout

  // Gestisce l'input dei campi del form
  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Valida i campi del form
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Email e password sono obbligatori.");
      return false;
    }
    return true;
  };

  // Gestisce il submit del form
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    console.log("Form submitted with data:", formData);

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
        login(data.token); // Salva il token
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

  // Reindirizzamento per login social (Google)
  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  // Reindirizzamento per login social (GitHub)
  const redirectToGithub = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/github`;
  };

  // Logout
  const handleLogout = () => {
    logout(); // Esegui il logout
    navigate("/"); // Reindirizza alla pagina di login
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {authData ? (
          <div>
            <h2 className="text-center mb-4">Benvenuto, {authData.role}</h2>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="w-100 mb-3"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4">Accedi al tuo account</h2>
            {errorMessage && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Inserisci la tua email"
                  onChange={handlerInput}
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
                  required
                  autoComplete="current-password"
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">
                Login
              </Button>
              <Button
                variant="danger"
                className="w-100 mb-2"
                onClick={redirectToGoogle}
              >
                Login con Google
              </Button>
              <Button
                variant="dark"
                className="w-100"
                onClick={redirectToGithub}
              >
                Login con GitHub
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
              </div>
            </Form>
          </>
        )}
      </div>
    </Container>
  );
};

export default Login;
*/

/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "./AuthContext"; // Importa il contesto

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, authData } = useAuth(); // Usa il contesto per ottenere la funzione login e logout

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        login(data.token, data.userId, data.role); // Chiama il login dal contesto

        if (onLogin) {
          onLogin(data);
        }

        if (handleCloseLogin) {
          handleCloseLogin();
        }

        const redirectTo = location.state?.from || "/home";
        navigate(redirectTo);
      } else {
        setErrorMessage("Email o password errati. Riprova.");
        console.error(`Errore: ${data.message}`);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  const redirectToGithub = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/github`;
  };

  const handleLogout = () => {
    logout(); // Esegui il logout dal contesto
    navigate("/login"); // Reindirizza alla pagina di login
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {authData ? (
          <div>
            <h2 className="text-center mb-4">Benvenuto, {authData.role}</h2>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="w-100 mb-3"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4">Accedi al tuo account</h2>
            {errorMessage && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}
            <Form onSubmit={onSubmit}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                onChange={handlerInput}
                required
                autoComplete="email"
              />

              <Form.Control
                type="password"
                name="password"
                placeholder="Inserisci la tua password"
                onChange={handlerInput}
                required
                autoComplete="current-password"
              />

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Login
              </Button>
              <Button
                variant="danger"
                className="w-100 mb-2"
                onClick={redirectToGoogle}
              >
                Login con Google
              </Button>
              <Button
                variant="dark"
                className="w-100"
                onClick={redirectToGithub}
              >
                Login con GitHub
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
              </div>
            </Form>
          </>
        )}
      </div>
    </Container>
  );
};

export default Login;
*/

/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSuccess = (token, userId, role) => {
    const sessionData = {
      token,
      userId,
      role,
    };
    localStorage.setItem("Authorization", JSON.stringify(sessionData));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData); // Log dei dati del form

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Server response:", data); // Log della risposta del server

      if (response.ok) {
        loginSuccess(data.token, data.userId, data.role);

        if (onLogin) {
          onLogin(data); // Passa i dati utente al callback del componente genitore
        }

        if (handleCloseLogin) {
          handleCloseLogin(); // Chiude il modale di login
        }

        const redirectTo = location.state?.from || "/home";
        navigate(redirectTo); // Reindirizza alla pagina precedente o alla homepage
      } else {
        setErrorMessage("Email o password errati. Riprova.");
        console.error(`Errore: ${data.message}`);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  const redirectToGithub = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/github`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Accedi al tuo account</h2>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Control
            type="email"
            name="email"
            placeholder="Inserisci la tua email"
            onChange={handlerInput}
            required
            autoComplete="email"
          />

          <Form.Control
            type="password"
            name="password"
            placeholder="Inserisci la tua password"
            onChange={handlerInput}
            required
            autoComplete="current-password"
          />

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
          <Button
            variant="danger"
            className="w-100 mb-2"
            onClick={redirectToGoogle}
          >
            Login con Google
          </Button>
          <Button variant="dark" className="w-100" onClick={redirectToGithub}>
            Login con GitHub
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
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/

/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSuccess = (token, userId, role) => {
    const sessionData = {
      token,
      userId,
      role,
    };
    localStorage.setItem("Authorization", JSON.stringify(sessionData));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Salva i dati del login in locale
        loginSuccess(data.token, data.userId, data.role);

        // Passa i dati utente al callback del componente genitore
        if (onLogin) {
          onLogin(data);
        }

        // Chiude il modale di login
        if (handleCloseLogin) {
          handleCloseLogin();
        }

        // Reindirizza alla pagina precedente o alla homepage
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } else {
        const errorData = await response.json();
        setErrorMessage("Email o password errati. Riprova.");
        console.error(`Errore: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/google`;
  };

  const redirectToGithub = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/github`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Accedi al tuo account</h2>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handlerInput}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Inserisci la tua password"
              onChange={handlerInput}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
          <Button
            variant="danger"
            className="w-100 mb-2"
            onClick={redirectToGoogle}
          >
            Login con Google
          </Button>
          <Button variant="dark" className="w-100" onClick={redirectToGithub}>
            Login con GitHub
          </Button>

          <div className="text-center mt-3">
            <p>
              Non hai un account?{" "}
              <a
                href="/about"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Registrati qui
              </a>
            </p>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/

/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSuccess = (token, userId, role) => {
    const sessionData = {
      token,
      userId,
      role,
    };
    localStorage.setItem("Authorization", JSON.stringify(sessionData));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Salva i dati del login in locale
        loginSuccess(data.token, data.userId, data.role);

        // Passa i dati utente al callback del componente genitore
        if (onLogin) {
          onLogin(data);
        }

        // Chiude il modale di login
        if (handleCloseLogin) {
          handleCloseLogin();
        }

        // Reindirizza alla pagina precedente o alla homepage
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } else {
        const errorData = await response.json();
        setErrorMessage("Email o password errati. Riprova.");
        console.error(`Errore: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Accedi al tuo account</h2>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handlerInput}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Inserisci la tua password"
              onChange={handlerInput}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
          <Button
            variant="danger"
            className="w-100 mb-2"
            onClick={redirectToGoogle}
          >
            Login con Google
          </Button>
          <Button variant="dark" className="w-100" onClick={redirectToGithub}>
            Login con GitHub
          </Button>

          <div className="text-center mt-3">
            <p>
              Non hai un account?{" "}
              <a
                href="/about"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Registrati qui
              </a>
            </p>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/

/*import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = ({ onLogin, handleCloseLogin }) => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const handleClose = () => {
    setShowLogin(false);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handlerInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSuccess = (token, user) => {
    const sessionData = {
      token: token,
      userId: user._id,
      email: user.email,
    };
    localStorage.getItem("Authorization", JSON.stringify(sessionData));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Usa la funzione loginSuccess per memorizzare il token e i dati utente
        loginSuccess(data.token, data.user);

        onLogin(data.user);
        handleClose();
        if (handleCloseLogin) {
          handleCloseLogin();
        }

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } else {
        const errorData = await response.json();
        setErrorMessage("Password o email errata. Riprova.");
        console.log(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToGoogle = () => {
    window.location.href = `http://localhost:3050/auth/google`;
  };
  const redirectToGithub = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/auth/github/`;
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Accedi al tuo account</h2>
        {errorMessage && (
          <p variant="danger" className="text-center">
            {errorMessage}
          </p>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handlerInput}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Inserisci la tua password"
              onChange={handlerInput}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
          <Button onClick={redirectToGoogle}>Login with Google</Button>
          <Button className="btn btn-dark" onClick={redirectToGithub}>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              id="github"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                fill="#24292f"
              />
            </svg>

            <span>Login with GitHUb</span>
          </Button>

          <div className="text-center mt-3">
            <p>
              Non hai un account?{" "}
              <a
                href="/about"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Registrati qui
              </a>
            </p>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
*/
/*
    if (!showLogin) {
        return null
    }
*/
