import Options from "./Options";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const handleClick = (event) => {
    setOrderPhase("review");
  };

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={handleClick}>Confirm order</Button>
    </div>
  );
}

export default OrderEntry;
