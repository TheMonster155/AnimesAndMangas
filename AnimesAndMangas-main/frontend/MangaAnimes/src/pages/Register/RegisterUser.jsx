import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Message from "./Message";
import useFormData from "./useFormData";
import { useValidation } from "./useValidation";

const UserRegistration = () => {
  const [formData, handleChange] = useFormData({
    email: "",
    password: "",
    username: "",
    surname: "",
  });

  const [message, setMessage] = useState(null);
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
      const response = await fetch("http://localhost:3051/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registrazione completata con successo!",
        });
        navigate("/");
        handleChange({ target: { name: "email", value: "" } });
        // Reset form
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrazione Utente</h2>
      {message && <Message type={message.type} text={message.text} />}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <InputField
          label="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          type="password"
        />
        <InputField
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <InputField
          label="Cognome"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
          autoComplete="family-name"
        />
        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;

// src/pages/UserRegistration.jsx
/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "./InputText";
import InputPassword from "./InputPassword";
import Message from "./Message";
import useFormData from "./useFormData";

const UserRegistration = () => {
  const [formData, handleChange] = useFormData({
    email: "",
    password: "",
    surname: "",
    address: "",
    username: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, surname, address, username } = formData;
    if (!email || !password || !surname || !address || !username) {
      setMessage({
        type: "error",
        text: "Tutti i campi obbligatori devono essere compilati.",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({
        type: "error",
        text: "Email non valida.",
      });
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
      const response = await fetch("http://localhost:3050/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registrazione completata con successo!",
        });
        navigate("/home");
        handleChange({ target: { name: "email", value: "" } });
        handleChange({ target: { name: "password", value: "" } });
        handleChange({ target: { name: "surname", value: "" } });
        handleChange({ target: { name: "address", value: "" } });
        handleChange({ target: { name: "username", value: "" } });
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrazione Utente</h2>
      {message && <Message type={message.type} text={message.text} />}
      <form onSubmit={handleSubmit}>
        <InputText
          label="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <InputPassword
          label="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <InputText
          label="Cognome"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
          autoComplete="family-name"
        />
        <InputText
          label="Indirizzo"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          autoComplete="street-address"
        />
        <InputText
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
*/

/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    surname: "",
    address: "",
    username: "",
  });

  const [message, setMessage] = useState(null); // Per mostrare il messaggio di successo o errore
  const navigate = useNavigate(); // Crea un hook per la navigazione

  // Gestione dei cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funzione di validazione della password
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se ci sono campi vuoti
    const { email, password, surname, address, username } = formData;
    if (!email || !password || !surname || !address || !username) {
      setMessage({
        type: "error",
        text: "Tutti i campi obbligatori devono essere compilati.",
      });
      return;
    }

    // Verifica la validità dell'email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({
        type: "error",
        text: "Email non valida.",
      });
      return;
    }

    // Verifica la lunghezza della password e le regole
    if (password.length < 8 || !validatePassword(password)) {
      setMessage({
        type: "error",
        text: "La password deve essere lunga almeno 8 caratteri, contenere una lettera maiuscola, un numero e un carattere speciale.",
      });
      return;
    }

    const dataToSend = { ...formData };

    try {
      const response = await fetch("http://localhost:3050/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log("Risposta dal server:", data);

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registrazione completata con successo!",
        });
        // Naviga verso la pagina /home dopo una registrazione riuscita
        navigate("/home");
        setFormData({
          email: "",
          password: "",
          surname: "",
          address: "",
          username: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Errore nella registrazione.",
        });
      }
    } catch (err) {
      console.error("Errore nella connessione:", err);
      setMessage({
        type: "error",
        text: "Errore nella connessione al server.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrazione Utente</h2>
      {message && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="form-label">
            Cognome
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Indirizzo
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
*/
