import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageData = {
      from: formData.email, // Usato l'email dell'utente
      subject: formData.subject, // Usato l'oggetto dell'utente
      text: formData.message, // Usato il messaggio dell'utente
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        Swal.fire({
          title: "Messaggio Inviato!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } else {
        setIsSubmitting(false);
        Swal.fire({
          title: "Errore!",
          text: "C'è stato un problema nell'inviare il messaggio.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error sending email:", error);
      Swal.fire({
        title: "Errore!",
        text: "C'è stato un errore di rete.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <NavbarComponent />

      <div className="contact-up"></div>

      <div className="container container_contact mt-5 d-flex justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-md-8">
            <h2 className="text-center text-white">Contattaci</h2>

            <div className="contact-text text-center text-white mb-3">
              <p>Ti risponderemo il prima possibile!</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formEmail" className="form-label text-white">
                  Indirizzo Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="formEmail"
                  name="email"
                  placeholder="Inserisci la tua email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formSubject" className="form-label text-white">
                  Oggetto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formSubject"
                  name="subject"
                  placeholder="Inserisci l'oggetto"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formMessage" className="form-label text-white">
                  Messaggio
                </label>
                <textarea
                  className="form-control"
                  id="formMessage"
                  rows="4"
                  placeholder="Scrivi il tuo messaggio qui"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Invio..." : "Invia Messaggio"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="contact-down"></div>

      <Footer />
    </>
  );
};

export default ContactPage;
