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
      userId: session._id,
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
    /*
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
*/

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
        // Mostra il messaggio di successo prima di svuotare il carrello
        setOrderMessage(
          "Grazie per il suo acquisto! Il pagamento è stato completato con successo."
        );

        // Dopo 2 secondi, svuota il carrello e reindirizza l'utente
        setTimeout(() => {
          clearCart(); // Svuota il carrello
          navigate("/"); // Reindirizza alla home page
        }, 2000);
      }
    } catch (error) {
      setOrderMessage("Errore nella creazione dell'ordine. Riprova.");
    } finally {
      setIsSubmitting(false); // Resetta il flag di invio
    }
  };
  return (
    <div className="orderFormBody  ">
      <h1>Carrello</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cartItem row">
              {/* Immagine a sinistra */}
              <div className="cartItemImageWrapper col-3">
                <img
                  src={item.file.url}
                  alt={item.title}
                  className="cartItemImage"
                />
              </div>

              {/* Dettagli prodotto a destra */}
              <div className="cartItemDetails col-9">
                <h4>{item.title}</h4>

                {/* Quantità */}
                <div className="quantityWrapper">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => decrementQuantity(item._id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => incrementQuantity(item._id)}
                  >
                    +
                  </button>
                </div>

                {/* Prezzo unitario */}
                <p>Prezzo unitario: €{item.price}</p>

                {/* Prezzo totale per il prodotto */}
                <p>Totale: €{(item.price * item.quantity).toFixed(2)}</p>

                {/* Icona per rimuovere il prodotto */}
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {/* Totale carrello */}
          <div className="cartTotal">
            <h3>Total: €{cartTotal}</h3>
          </div>

          <div className="shippingForm">
            <h2>Indirizzo di spedizione</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Indirizzo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Città"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="CAP"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Paese"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>

          {isConfirmed ? (
            <div className="stripeWrapper">
              <CardElement />
              <button
                className="btn btn-primary"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Conferma Ordine"}
              </button>
              {orderMessage && <p>{orderMessage}</p>}
            </div>
          ) : (
            <button className="btn btn-success" onClick={handleConfirmOrder}>
              Conferma Ordine
            </button>
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
            <div key={item._id} className="cartItem row">
              <div className="cartItemDetails col-8 d-flex align-items-center">
                <img
                  src={item.file.url}
                  alt={item.title}
                  className="cartItemImage"
                />
                <div>
                  <h4>{item.title}</h4>
                  <p>Unit Price: €{item.price}</p>
                  <div>
                    <button className="btn btn-outline-secondary" onClick={() => decrementQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-secondary" onClick={() => incrementQuantity(item._id)}>+</button>
                  </div>
                </div>
              </div>
              <button className="btn btn-danger col-4" onClick={() => removeFromCart(item._id)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="cartTotal">Total: €{cartTotal}</div>
          <div className="shippingForm">
            <h2>Indirizzo di spedizione</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Indirizzo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Città"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="CAP"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Paese"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          {isConfirmed ? (
            <div className="stripeWrapper">
              <CardElement />
              <button
                className="btn btn-primary"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Conferma Ordine"}
              </button>
              {orderMessage && <p>{orderMessage}</p>}
            </div>
          ) : (
            <button className="btn btn-success" onClick={handleConfirmOrder}>Conferma Ordine</button>
          )}
        </>
      ) : (
        <p>Il carrello è vuoto.</p>
      )}
    </div>
  );
};

export default OrderForm;
*/
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
              <div className="cartItemDetails">
             
                <img
                  src={item.file.url}
                  alt={item.title}
                  className="cartItemImage"
                />
                <div>
                  <h4>{item.title}</h4>
                  <p>Unit Price: €{item.price}</p>
                  <div>
                    <button onClick={() => decrementQuantity(item._id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item._id)}>
                      +
                    </button>
                  </div>
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
*/

/*  return (
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
  );*/
