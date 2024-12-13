import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
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
  const navigate = useNavigate(); // Inizializza useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula l'invio del modulo (puoi sostituirlo con una chiamata API reale)
    setTimeout(() => {
      setIsSubmitting(false);

      // Mostra il messaggio di successo con SweetAlert2
      Swal.fire({
        title: "Messaggio Inviato!",
        text: "Il tuo messaggio è stato inviato con successo.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Reindirizza alla home page dopo che l'utente clicca "OK" su SweetAlert2
        navigate("/");
      });
    }, 2000);
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
              {/* Email Input */}
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

              {/* Subject Input */}
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

              {/* Message Input */}
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

              {/* Submit Button */}
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

/*import React, { useState } from "react";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (you can replace this with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({
        message: "Your message has been sent successfully!",
        type: "success",
      });
    }, 2000);
  };

  return (
    <>
      <NavbarComponent />

      <div className="contact-up"></div>

      <div className="container container_contact mt-5 d-flex justify-content-center">
        <div className="row justify-content-center w-100">
          <div className="col-md-8">
            <h2 className="text-center">Contact Us</h2>

            <div className="contact-text text-center mb-3">
              <p>We will get back to you as soon as possible!</p>
            </div>

            <form onSubmit={handleSubmit}>
             
              <div className="mb-3">
                <label htmlFor="formEmail" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="formEmail"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formSubject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formSubject"
                  name="subject"
                  placeholder="Enter the subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

           
              <div className="mb-3">
                <label htmlFor="formMessage" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="formMessage"
                  rows="4"
                  placeholder="Write your message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              
              {feedback.message && (
                <div
                  className={`alert alert-${
                    feedback.type === "success" ? "success" : "danger"
                  } mt-3`}
                >
                  {feedback.message}
                </div>
              )}

              
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
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
*/

/*import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    message: "",
    type: "", // "success" or "error"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: "", type: "" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: formData.email,
            subject: formData.subject,
            text: formData.message,
            html: `<p>${formData.message}</p>`, // Includiamo anche il formato HTML
          }),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        setFeedback({
          message: "Email sent successfully!",
          type: "success",
        });
        setFormData({ email: "", subject: "", message: "" }); // Reset del form
      } else {
        setFeedback({
          message:
            "There was an issue sending your message. Please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setFeedback({
        message: "An unexpected error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Contact Us</h2>
            <form onSubmit={handleSubmit}>
            
              <div className="mb-3">
                <label htmlFor="formEmail" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="formEmail"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            
              <div className="mb-3">
                <label htmlFor="formSubject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formSubject"
                  name="subject"
                  placeholder="Enter the subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formMessage" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="formMessage"
                  rows="4"
                  placeholder="Write your message here"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

           
              {feedback.message && (
                <div
                  className={`alert alert-${
                    feedback.type === "success" ? "success" : "danger"
                  } mt-3`}
                >
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
*/
