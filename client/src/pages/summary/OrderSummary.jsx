import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([itemName, itemCount]) => (
    <li key={itemName}>
      {itemCount} {itemName}
    </li>
  ));

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingArray = Array.from(orderDetails.toppings.entries());
    const toppingList = toppingArray.map(([itemName]) => (
      <li key={itemName}>{itemName}</li>
    ));
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <h2>Total {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

export default OrderSummary;
