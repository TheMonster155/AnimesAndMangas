import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "./InputText";
import InputPassword from "./InputPassword";
import Message from "./Message";
import useFormData from "./useFormData";
import { useValidation } from "./useValidation";
import SelectField from "./SelectField";

const SellerRegistration = () => {
  const [formData, handleChange, resetForm] = useFormData({
    email: "",
    password: "",
    surname: "",
    address: "",
    username: "",
    shopName: "",
    shopAddress: "",
    vatNumber: "",
    phone: "",
    website: "",

    birthYear: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { validatePassword, validateEmail } = useValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", formData); // Log dei dati nel form

    const requiredFields = [
      "email",
      "password",
      "surname",
      "address",
      "username",
      "shopName",
      "shopAddress",
      "vatNumber",
      "phone",
      "website",

      "birthYear",
    ];

    // Controlla se tutti i campi richiesti sono compilati
    for (const field of requiredFields) {
      if (!formData[field]) {
        console.log(`Campo obbligatorio mancante: ${field}`); // Log del campo mancante
        setMessage({
          type: "error",
          text: "Tutti i campi obbligatori devono essere compilati.",
        });
        return;
      }
    }

    // Validazioni
    if (!validateEmail(formData.email)) {
      console.log("Email non valida:", formData.email); // Log dell'email non valida
      setMessage({ type: "error", text: "Email non valida." });
      return;
    }

    if (!validatePassword(formData.password)) {
      console.log("Password non valida:", formData.password); // Log della password non valida
      setMessage({
        type: "error",
        text: "La password deve contenere almeno 8 caratteri, una lettera maiuscola, un numero e un carattere speciale.",
      });
      return;
    }

    // Verifica che la data di nascita sia valida
    const birthYear = new Date(formData.birthYear);
    console.log("Data di nascita:", birthYear); // Log della data di nascita

    if (isNaN(birthYear)) {
      console.log("Data di nascita non valida."); // Log di data non valida
      setMessage({ type: "error", text: "La data di nascita non è valida." });
      return;
    }

    const today = new Date();
    if (birthYear > today) {
      console.log("Data di nascita nel futuro."); // Log se la data di nascita è nel futuro
      setMessage({
        type: "error",
        text: "La data di nascita non può essere nel futuro.",
      });
      return;
    }

    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18); // Età minima 18 anni
    if (birthYear > minAgeDate) {
      console.log("Utente troppo giovane per registrarsi."); // Log se l'utente ha meno di 18 anni
      setMessage({
        type: "error",
        text: "Devi avere almeno 18 anni per registrarti.",
      });
      return;
    }

    // Prepara i dati per l'invio
    const preparedData = {
      ...formData,
      birthYear: birthYear.toISOString(),
    };
    console.log("Dati pronti per l'invio:", preparedData); // Log dei dati pronti per l'invio

    // Invio dei dati al server
    try {
      const response = await fetch("http://localhost:3050/seller/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      const data = await response.json();
      console.log("Risposta del server:", data); // Log della risposta del server

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registrazione completata con successo!",
        });
        resetForm(); // Resetta tutti i campi
        navigate("/"); // Reindirizza alla home
      } else {
        console.log("Errore nella risposta del server:", data.error); // Log se c'è un errore nel server
        setMessage({
          type: "error",
          text: data.error || "Errore nella registrazione.",
        });
      }
    } catch (err) {
      console.log("Errore nella connessione al server:", err); // Log di eventuali errori di connessione
      setMessage({
        type: "error",
        text: "Errore nella connessione al server.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrazione Venditore</h2>
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
          autoComplete="new-password"
        />
        <InputText
          label="Cognome"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <InputText
          label="Indirizzo"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <InputText
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputText
          label="Nome del negozio"
          id="shopName"
          name="shopName"
          value={formData.shopName}
          onChange={handleChange}
          required
        />
        <InputText
          label="Indirizzo del negozio"
          id="shopAddress"
          name="shopAddress"
          value={formData.shopAddress}
          onChange={handleChange}
          required
        />
        <InputText
          label="Partita IVA"
          id="vatNumber"
          name="vatNumber"
          value={formData.vatNumber}
          onChange={handleChange}
          required
        />
        <InputText
          label="Telefono"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <InputText
          label="Sito web"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          required
        />

        <InputText
          label="Anno di nascita"
          id="birthYear"
          name="birthYear"
          value={formData.birthYear}
          onChange={handleChange}
          required
          type="date"
        />
        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default SellerRegistration;
