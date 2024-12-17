import { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../Context/CartContext";
import "./OrderForm.css";
import useSession from "../../hohcks/useSession";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../Navbar/Navbar";

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
        setOrderMessage(
          "Grazie per il suo acquisto! Il pagamento è stato completato con successo."
        );

        setTimeout(() => {
          clearCart();
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setOrderMessage("Errore nella creazione dell'ordine. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="orderFormBody">
        <h1>Carrello</h1>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div key={item._id} className="cartItem row mb-3">
                <div className="cartItemImageWrapper col-12 col-md-3">
                  <img
                    src={item.file.url}
                    alt={item.title}
                    className="cartItemImage img-fluid"
                  />
                </div>

                <div className="cartItemDetails col-12 col-md-9">
                  <h4>{item.title}</h4>

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

                  <p>Prezzo unitario: €{item.price}</p>
                  <p>Totale: €{(item.price * item.quantity).toFixed(2)}</p>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

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

            <div className="stripeWrapper row">
              <div className="col-12 col-md-8">
                <CardElement className="form-control" />
              </div>

              <div className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center">
                {isConfirmed ? (
                  <>
                    <div className="row mb-3">
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleSubmitOrder}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Conferma Ordine"}
                      </button>
                    </div>

                    {orderMessage && (
                      <div className="row w-100">
                        <p>{orderMessage}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="row">
                    <button
                      className="btn btn-success w-100"
                      onClick={handleConfirmOrder}
                    >
                      Conferma Ordine
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Il carrello è vuoto.</p>
        )}
      </div>
    </>
  );
};

export default OrderForm;
