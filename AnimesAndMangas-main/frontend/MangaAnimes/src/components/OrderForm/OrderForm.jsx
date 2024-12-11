import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import "./OrderForm.css";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId,
      items: cart.map((item) => {
        const itemData = {
          quantity: item.quantity,
          price: parseFloat(item.price) * item.quantity,
        };

        if (item.mangaId) {
          itemData.mangaId = item.mangaId;
        } else if (item.actionFigureId) {
          itemData.actionFigureId = item.actionFigureId;
        }

        return itemData;
      }),
      shippingAddress: {
        name,
        address,
        city,
        postalCode,
        country,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Order creation error");
      }

      const { clientSecret } = await response.json();
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setOrderMessage(`Payment error: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Order and payment completed successfully!");
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setOrderMessage("Error creating order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orderFormBody">
      <h1>Carrello</h1>
      {cart.length > 0 ? (
        <>
          <h2>Carrello</h2>
          {cart.map((item) => (
            <div key={item._id} className="cartItem">
              <div>
                <h4>{item.title}</h4>
                <p>Unit Price: €{item.price}</p>
                <div>
                  <button onClick={() => decrementQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item._id)}>+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="cartTotal">Total: €{cartTotal}</div>
          <div className="shippingForm">
            <h2>Indirizzo di spedizione</h2>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Indirizzo"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Città"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CAP"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Paese"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          {isConfirmed ? (
            <div className="stripeWrapper">
              <CardElement />
              <button
                className="confirmBtn"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Conferma Ordine"}
              </button>
              {orderMessage && <p>{orderMessage}</p>}
            </div>
          ) : (
            <button onClick={handleConfirmOrder}>Conferma Ordine</button>
          )}
        </>
      ) : (
        <p>Il carrello è vuoto.</p>
      )}
    </div>
  );
};

export default OrderForm;
/*import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import "./OrderForm.css";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
  };
  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId, // Usa session.userId
      items: cart.map((item) => ({
        quantity: item.quantity,
        price: parseFloat(item.price) * item.quantity, // Prezzo come numero
        mangaId: item.mangaId || undefined, // Invia mangaId se presente
        actionFigureId: item.actionFigureId || undefined, // Invia actionFigureId se presente
      })),
      shippingAddress: {
        name,
        address,
        city,
        postalCode,
        country,
      },
    };
    console.log("Dati ordine:", orderData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`, // URL corretto
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Errore nella creazione dell'ordine"
        );
      }

      const { clientSecret } = await response.json();
      console.log("PaymentIntent ricevuto dal server:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
        console.error("Errore nel pagamento:", result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        console.log("Pagamento riuscito, ordine completato!");

        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orderFormBody">
      <h1 className="title">Carrello</h1>

      {cart.length > 0 ? (
        <>
          <h2 className="cartTitle">Carrello</h2>
          {cart.map((item) => (
            <div key={item._id} className="cartItem">
              <div className="cartItemDetails">
                <h4 className="cartItemTitle">{item.title}</h4>
                <p>Prezzo unitario: €{parseFloat(item.price).toFixed(2)}</p>
                <div className="quantityControls">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    className="decrementButton"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="incrementButton"
                  >
                    +
                  </button>
                </div>
                <p>
                  Prezzo totale: €{" "}
                  {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="removeButton"
                  aria-label="Rimuovi elemento"
                >
                  <FaTrash size="24" color="#ff4d4f" />{" "}
                </button>
              </div>
              <img src={item.img} alt={item.title} className="cartItemImage" />
            </div>
          ))}
          <div className="paymentSection">
            <h3>Totale carrello: €{cartTotal}</h3>
          </div>

          {!isConfirmed ? (
            <>
              <h3>Indirizzo di spedizione</h3>
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Indirizzo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Città"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="CAP"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Paese"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <button onClick={handleConfirmOrder} className="button">
                Acquista (€{cartTotal})
              </button>
            </>
          ) : (
            <>
              <h3>Pagamento</h3>
              <CardElement className="cardElement" />
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="button"
              >
                {isSubmitting ? "Inviando..." : "Pagamento"}
              </button>
            </>
          )}
        </>
      ) : (
        <p>Il carrello è vuoto!</p>
      )}

      {orderMessage && <p className="statusMessage">{orderMessage}</p>}
    </div>
  );
};

export default OrderForm;
*/

/*  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId, // Usa session.userId invece di session._id
      items: cart.map((item) => {
        const itemData = {
          quantity: item.quantity,
          price: (parseFloat(item.price) * item.quantity).toFixed(2),
        };
        console.log("User ID dalla sessione:", session.userId); // Modifica anche qui il log

        if (item.mangaId) {
          itemData.mangaId = item._id;
        } else if (item.actionFigureId) {
          itemData.actionFigureId = item._id;
        }
        console.log("Item data being sent:", itemData); // Log dei dati per ogni articolo

        return itemData;
      }),
      shippingAddress: {
        name,
        address,
        city,
        postalCode,
        country,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const { clientSecret } = await response.json();
      console.log("PaymentIntent ricevuto dal server:", clientSecret); // Log del paymentIntent

      const result = await stripe.confirmCardPayment(
        clientSecret,
        // qui il problema
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
        console.error("Errore nel pagamento:", result.error.message); // Log dell'errore nel pagamento
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        console.log("Pagamento riuscito, ordine completato!"); // Log di pagamento riuscito

        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
      console.error("Errore durante la creazione dell'ordine:", error); // Log dell'errore nell'invio dell'ordine
    }

    setIsSubmitting(false);
  };*/

/*import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import "./OrderForm.css";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId, // Usa session.userId invece di session._id
      items: cart.map((item) => {
        const itemData = {
          quantity: item.quantity,
          price: (parseFloat(item.price) * item.quantity).toFixed(2),
        };
        console.log("User ID dalla sessione:", session.userId); // Modifica anche qui il log

        if (item.mangaId) {
          itemData.mangaId = item._id;
        } else if (item.actionFigureId) {
          itemData.actionFigureId = item._id;
        }
        console.log("Item data being sent:", itemData); // Log dei dati per ogni articolo

        return itemData;
      }),
      shippingAddress: {},
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const { clientSecret } = await response.json();
      console.log("PaymentIntent ricevuto dal server:", clientSecret); // Log del paymentIntent

      const result = await stripe.confirmCardPayment(
        clientSecret,
        // qui il problema
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
        console.error("Errore nel pagamento:", result.error.message); // Log dell'errore nel pagamento
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        console.log("Pagamento riuscito, ordine completato!"); // Log di pagamento riuscito

        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
      console.error("Errore durante la creazione dell'ordine:", error); // Log dell'errore nell'invio dell'ordine
    }

    setIsSubmitting(false);
  };

  return (
    <div className="orderFormBody">
      <h1 className="title">Carrello</h1>

      {cart.length > 0 ? (
        <>
          <h2 className="cartTitle">Carrello</h2>
          {cart.map((item) => (
            <div key={item._id} className="cartItem">
              <div className="cartItemDetails">
                <h4 className="cartItemTitle">{item.title}</h4>
                <p>Prezzo unitario: €{parseFloat(item.price).toFixed(2)}</p>
                <div className="quantityControls">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    className="decrementButton"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="incrementButton"
                  >
                    +
                  </button>
                </div>
                <p>
                  Prezzo totale: €
                  {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="removeButton"
                  aria-label="Rimuovi elemento"
                >
                  <FaTrash size="24" color="#ff4d4f" />{" "}
                </button>
              </div>
              <img src={item.img} alt={item.title} className="cartItemImage" />
            </div>
          ))}
          <div className="paymentSection">
            <h3>Totale carrello: €{cartTotal}</h3>
          </div>

          {!isConfirmed ? (
            <button onClick={handleConfirmOrder} className="button">
              Acquista (€{cartTotal})
            </button>
          ) : (
            <>
              <h3>Pagamento</h3>
              <CardElement className="cardElement" />
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="button"
              >
                {isSubmitting ? "Inviando..." : "Pagamento"}
              </button>
            </>
          )}
        </>
      ) : (
        <p>Il carrello è vuoto!</p>
      )}

      {orderMessage && <p className="statusMessage">{orderMessage}</p>}
    </div>
  );
};

export default OrderForm;
*/

/*
import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";

const OrderForm = ({ cart }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { userId } = useContext(CartContext); // Assuming you have userId stored in context or props

  useEffect(() => {
    if (orderStatus === "success") {
      // Reset the cart or perform any action after successful order
    }
  }, [orderStatus]);

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Controlla che Stripe e gli Elements siano pronti
    if (!stripe || !elements) {
      return;
    }

    try {
      // Step 1: Crea l'ordine nel backend
      const response = await fetch("http://localhost:3050/order/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Assicurati che userId sia passato correttamente
          items: cart.items,
          shippingAddress: cart.shippingAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Step 2: Se l'ordine è stato creato correttamente, recupera il clientSecret
        const { clientSecret } = data;

        // Step 3: Conferma il pagamento con Stripe
        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

        if (error) {
          setErrorMessage(error.message); // Mostra l'errore di pagamento
          setLoading(false);
        } else if (paymentIntent.status === "succeeded") {
          setOrderStatus("success");
          setLoading(false);
          console.log("Pagamento completato con successo!");
          // Puoi fare qualcosa dopo che il pagamento è andato a buon fine, come redirigere l'utente
        }
      } else {
        setErrorMessage(data.error); // Mostra l'errore del backend
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Errore nella richiesta al backend.");
      setLoading(false);
    }
  };

  return (
    <div className="order-form">
      <h2>Completa il tuo ordine</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {orderStatus === "success" && (
        <div className="success-message">
          Il tuo ordine è stato effettuato con successo! Grazie per aver
          acquistato.
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="order-summary">
          <h3>Riepilogo Ordine</h3>
          <p>
            <strong>Articoli:</strong> {cart.items.length} articoli
          </p>
          <p>
            <strong>Totale:</strong> €{cart.totalPrice.toFixed(2)}
          </p>

          <h3>Indirizzo di spedizione</h3>
          <p>{cart.shippingAddress.fullName}</p>
          <p>{cart.shippingAddress.street}</p>
          <p>
            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
          </p>
          <p>{cart.shippingAddress.country}</p>
        </div>

        <div className="payment-section">
          <h3>Pagamento</h3>
          <label>
            Dettagli carta di credito
            <CardElement />
          </label>
        </div>

        <button type="submit" disabled={loading || orderStatus === "success"}>
          {loading ? "Caricamento..." : "Completa l'ordine"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
*/
/*
const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    // Controlla che tutti i campi siano compilati
    const isFormComplete = Object.values(shippingAddress).every(
      (value) => value.trim() !== ""
    );

    if (!isFormComplete) {
      setOrderMessage("Per favore compila tutti i campi di spedizione.");
      return;
    }

    setOrderMessage("");
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId,
      items: cart.map((item) => ({
        quantity: item.quantity,
        price: (parseFloat(item.price) * item.quantity).toFixed(2),
        ...(item.mangaId
          ? { mangaId: item._id }
          : { actionFigureId: item._id }),
      })),
      shippingAddress,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div className="orderFormBody">
      <h1 className="title">Carrello</h1>

      {cart.length > 0 ? (
        <>
          <h2 className="cartTitle">Carrello</h2>
          {cart.map((item) => (
            <div key={item._id} className="cartItem">
              <div className="cartItemDetails">
                <h4 className="cartItemTitle">{item.title}</h4>
                <p>Prezzo unitario: €{parseFloat(item.price).toFixed(2)}</p>
                <div className="quantityControls">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    disabled={item.quantity <= 1}
                    className="decrementButton"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="incrementButton"
                  >
                    +
                  </button>
                </div>
                <p>
                  Prezzo totale: €
                  {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="removeButton"
                  aria-label="Rimuovi elemento"
                >
                  <FaTrash size="24" color="#ff4d4f" />{" "}
                </button>
              </div>
              <img src={item.img} alt={item.title} className="cartItemImage" />
            </div>
          ))}
          <div className="paymentSection">
            <h3>Totale carrello: €{cartTotal}</h3>
          </div>

          {!isConfirmed ? (
            <>
              <h3>Indirizzo di Spedizione</h3>
              <form className="shippingForm">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nome completo"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Indirizzo"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Città"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="CAP"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Paese"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                />
              </form>
              <button onClick={handleConfirmOrder} className="button">
                Conferma Ordine (€{cartTotal})
              </button>
            </>
          ) : (
            <>
              <h3>Pagamento</h3>
              <CardElement className="cardElement" />
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="button"
              >
                {isSubmitting ? "Inviando..." : "Pagamento"}
              </button>
            </>
          )}
        </>
      ) : (
        <p>Il carrello è vuoto!</p>
      )}

      {orderMessage && <p className="statusMessage">{orderMessage}</p>}
    </div>
  );
};
*/
/*
import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import "./OrderForm.css";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    // Controlla che tutti i campi siano compilati
    const isFormComplete = Object.values(shippingAddress).every(
      (value) => value.trim() !== ""
    );

    if (!isFormComplete) {
      setOrderMessage("Per favore compila tutti i campi di spedizione.");
      return;
    }

    setOrderMessage("");
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId,
      items: cart.map((item) => ({
        quantity: item.quantity,
        price: (parseFloat(item.price) * item.quantity).toFixed(2),
        ...(item.mangaId
          ? { mangaId: item._id }
          : { actionFigureId: item._id }),
      })),
      shippingAddress,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const { clientSecret, message } = await response.json();
      if (response.status === 400) {
        setOrderMessage(message);
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orderForm">
      <h2>Dettagli Ordine</h2>
      <form>
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Indirizzo</label>
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Città</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Codice Postale</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Paese</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
        >
          Conferma Ordine
        </button>
      </form>

      {orderMessage && <p>{orderMessage}</p>}

      {isConfirmed && (
        <div className="payment-form">
          <CardElement />
          <button
            type="button"
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
          >
            Paga
          </button>
        </div>
      )}
    </div>
  );
};
export default OrderForm;
*/
/*
import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import "./OrderForm.css";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    // Controlla che tutti i campi siano compilati
    const isFormComplete = Object.values(shippingAddress).every(
      (value) => value.trim() !== ""
    );

    if (!isFormComplete) {
      setOrderMessage("Per favore compila tutti i campi di spedizione.");
      return;
    }

    setOrderMessage("");
    setIsConfirmed(true);
  };

  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId,
      items: cart.map((item) => ({
        quantity: item.quantity,
        price: (parseFloat(item.price) * item.quantity).toFixed(2),
        ...(item.mangaId
          ? { mangaId: item._id }
          : { actionFigureId: item._id }),
      })),
      shippingAddress,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const { clientSecret, message } = await response.json();
      if (response.status === 400) {
        setOrderMessage(message);
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orderForm">
      <h2>Dettagli Ordine</h2>
      <form>
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Indirizzo</label>
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Città</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Codice Postale</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Paese</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="button"
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
        >
          Conferma Ordine
        </button>
      </form>

      {orderMessage && <p>{orderMessage}</p>}

      {isConfirmed && (
        <div className="payment-form">
          <CardElement />
          <button
            type="button"
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
          >
            Paga
          </button>
        </div>
      )}
    </div>
  );
};
export default OrderForm;
*/
/*
import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OrderForm.css";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  // Calcolo del totale del carrello
  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  // Gestisce i cambiamenti nei campi dell'indirizzo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Conferma l'ordine dopo che l'utente ha compilato i campi
  const handleConfirmOrder = () => {
    const isFormComplete = Object.values(shippingAddress).every(
      (value) => value.trim() !== ""
    );

    if (!isFormComplete) {
      setOrderMessage("Per favore compila tutti i campi di spedizione.");
      return;
    }

    setOrderMessage("");
    setIsConfirmed(true);
  };

  // Gestisce l'invio dell'ordine e il pagamento con Stripe
  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId,
      items: cart.map((item) => ({
        quantity: item.quantity,
        price: (parseFloat(item.price) * item.quantity).toFixed(2),
        ...(item.mangaId
          ? { mangaId: item._id }
          : { actionFigureId: item._id }),
      })),
      shippingAddress,
    };

    try {
      // Crea l'ordine sul server
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const { clientSecret, message } = await response.json();
      if (response.status === 400) {
        setOrderMessage(message);
      }

      // Conferma il pagamento con Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        clearCart();

        setTimeout(() => {
          navigate("/order-success"); // Redirect alla pagina di successo
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orderForm">
      <h2>Dettagli Ordine</h2>
      <form>
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Indirizzo</label>
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Città</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Codice Postale</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Paese</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="button"
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
        >
          Conferma Ordine
        </button>
      </form>

      {orderMessage && <p>{orderMessage}</p>}

      {isConfirmed && (
        <div className="payment-form">
          <CardElement />
          <button
            type="button"
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
          >
            Paga
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
*/

/*
import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./OrderForm.css";

const OrderForm = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const navigate = useNavigate();

  // Calcolo del totale del carrello
  const cartTotal = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  // Gestisce i cambiamenti nei campi dell'indirizzo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Conferma l'ordine dopo che l'utente ha compilato i campi
  const handleConfirmOrder = () => {
    console.log("Handle Confirm Order");

    const isFormComplete = Object.values(shippingAddress).every(
      (value) => value.trim() !== ""
    );

    // Aggiungi il controllo sul carrello vuoto
    if (cart.length === 0) {
      setOrderMessage(
        "Il carrello è vuoto. Aggiungi degli articoli prima di confermare."
      );
      return;
    }

    if (!isFormComplete) {
      setOrderMessage("Per favore compila tutti i campi di spedizione.");
      return;
    }

    setOrderMessage("");
    setIsConfirmed(true);
    console.log("Ordine confermato");
  };

  // Gestisce l'invio dell'ordine e il pagamento con Stripe
  const handleSubmitOrder = async () => {
    if (!stripe || !elements) return;
    setIsSubmitting(true);
    setOrderMessage("");

    const orderData = {
      userId: session.userId,
      items: cart.map((item) => ({
        quantity: item.quantity,
        price: (parseFloat(item.price) * item.quantity).toFixed(2),
        ...(item.mangaId
          ? { mangaId: item._id }
          : { actionFigureId: item._id }),
      })),
      shippingAddress,
    };

    console.log("Dati dell'ordine:", orderData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        setOrderMessage(message || "Errore nell'invio dell'ordine.");
        console.log("Errore server:", message);
        return;
      }

      const { clientSecret, message } = await response.json();

      if (!clientSecret) {
        setOrderMessage("Errore nel ricevere i dati del pagamento.");
        console.log("clientSecret mancante:", message);
        return;
      }

      console.log("clientSecret ricevuto:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setOrderMessage(`Errore nel pagamento: ${result.error.message}`);
        console.log("Errore Stripe:", result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setOrderMessage("Ordine creato e pagamento effettuato con successo!");
        console.log("Pagamento riuscito:", result.paymentIntent);

        clearCart();

        setTimeout(() => {
          navigate("/order-success");
        }, 2000);
      }
    } catch (error) {
      console.error("Errore nell'invio dell'ordine:", error);
      setOrderMessage(
        "Si è verificato un errore durante la creazione dell'ordine."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="orderForm">
      <h2>Dettagli Ordine</h2>
      <form>
        <div>
          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Indirizzo</label>
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Città</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Codice Postale</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Paese</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="button"
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
        >
          Conferma Ordine
        </button>
      </form>

      {orderMessage && <p>{orderMessage}</p>}

      {isConfirmed && (
        <div className="payment-form">
          <CardElement />
          {isSubmitting && <p>Pagamento in corso...</p>}
          <button
            type="button"
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
          >
            Paga
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
*/
