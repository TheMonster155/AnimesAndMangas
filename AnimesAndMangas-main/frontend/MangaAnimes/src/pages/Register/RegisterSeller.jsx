import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "./InputText";
import InputPassword from "./InputPassword";
import Message from "./Message";
import useFormData from "./useFormData";
import { useValidation } from "./useValidation";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { validatePassword, validateEmail } = useValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setMessage({
        type: "error",
        text: "Devi accettare le condizioni d'uso per continuare.",
      });
      return;
    }

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

    for (const field of requiredFields) {
      if (!formData[field]) {
        setMessage({
          type: "error",
          text: "Tutti i campi obbligatori devono essere compilati.",
        });
        return;
      }
    }

    if (!validateEmail(formData.email)) {
      setMessage({ type: "error", text: "Email non valida." });
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage({
        type: "error",
        text: "La password deve contenere almeno 8 caratteri, una lettera maiuscola, un numero e un carattere speciale.",
      });
      return;
    }

    const birthYear = new Date(formData.birthYear);
    if (isNaN(birthYear)) {
      setMessage({ type: "error", text: "La data di nascita non è valida." });
      return;
    }

    const today = new Date();
    if (birthYear > today) {
      setMessage({
        type: "error",
        text: "La data di nascita non può essere nel futuro.",
      });
      return;
    }

    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
    if (birthYear > minAgeDate) {
      setMessage({
        type: "error",
        text: "Devi avere almeno 18 anni per registrarti.",
      });
      return;
    }

    const preparedData = {
      ...formData,
      birthYear: birthYear.toISOString(),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/seller/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preparedData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registrazione completata con successo!",
        });
        resetForm();
        navigate("/");
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
    <>
      <NavbarComponent />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="border p-4 rounded d-flex flex-column justify-content-between"
          style={{ width: "90%", maxWidth: "800px", height: "80vh" }}
        >
          <h2 className="text-center mb-4">Registrazione Venditore</h2>
          {message && <Message type={message.type} text={message.text} />}
          <form onSubmit={handleSubmit} className="h-100 d-flex flex-column">
            <div className="row flex-grow-1">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
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
              </div>
            </div>
            <div className="form-check my-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="terms">
                Accetti le nostre condizioni d'uso
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-auto">
              Registrati
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerRegistration;
