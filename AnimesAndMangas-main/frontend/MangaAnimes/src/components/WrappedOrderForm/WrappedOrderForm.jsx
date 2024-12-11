import { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../Context/CartContext";
import OrderForm from "../OrderForm/OrderForm";

const stripePromise = loadStripe("pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs");

const WrappedOrderForm = () => {
  const { cart } = useContext(CartContext);

  return (
    <Elements stripe={stripePromise}>
      <OrderForm />
    </Elements>
  );
};

export default WrappedOrderForm;
