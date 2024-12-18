import { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../Context/CartContext";
import OrderForm from "../OrderForm/OrderForm";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_CLIENT_SECRET}`
);

const WrappedOrderForm = () => {
  const { cart } = useContext(CartContext);

  return (
    <Elements stripe={stripePromise}>
      <OrderForm />
    </Elements>
  );
};

export default WrappedOrderForm;
