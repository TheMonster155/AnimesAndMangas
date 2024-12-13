import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Message from "./Message";
import useFormData from "./useFormData";
import { useValidation } from "./useValidation";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import "./RegisterUser.css";

const UserRegistration = () => {
  const [formData, handleChange] = useFormData({
    email: "",
    password: "",
    username: "",
    surname: "",
  });

  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { validatePassword, validateEmail } = useValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, username, surname } = formData;

    if (!email || !password || !username || !surname) {
      setMessage({
        type: "error",
        text: "Tutti i campi obbligatori devono essere compilati.",
      });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Email non valida." });
      return;
    }

    if (password.length < 8 || !validatePassword(password)) {
      setMessage({
        type: "error",
        text: "La password deve essere lunga almeno 8 caratteri, contenere una lettera maiuscola, un numero e un carattere speciale.",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registrazione completata con successo!",
        });

        Swal.fire({
          icon: "success",
          title: "Registrazione completata!",
          text: "Benvenuto! Verrai reindirizzato alla home.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });

        handleChange({ target: { name: "email", value: "" } });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Errore nella registrazione.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Errore nella connessione al server.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <NavbarComponent />
      <div className="c" />
      <div className="container mt-5">
        <h2 className="mb-5">Registrazione Utente</h2>
        {message && <Message type={message.type} text={message.text} />}
        <div className="row d-flex justify-content-between">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="mb-5"
              />
              <div className="input-group mb-3">
                {" "}
                <span
                  className="input-group-text  email_space"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}{" "}
                </span>
                <InputField
                  label="Password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  className="mb-3 "
                />
              </div>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className="mb-3"
              />
              <InputField
                label="Cognome"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="mb-3"
              />
              <button type="submit" className="btn btn-primary">
                Registrati
              </button>
            </form>
          </div>

          <div className="col-md-5 conditions-container">
            <h5>Condizioni di Uso</h5>
            <p>
              Registrandoti, accetti le condizioni d'uso e acconsenti
              all'elaborazione dei tuoi dati personali in conformità con la
              nostra
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              . Inoltre, confermi di essere a conoscenza dei tuoi diritti in
              materia di protezione dei dati e del trattamento dei tuoi dati
              personali.
            </p>
          </div>
        </div>
      </div>
      <div className="registerUser-down" />
      <Footer />
    </>
  );
};

export default UserRegistration;
