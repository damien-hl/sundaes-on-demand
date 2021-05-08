import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

// Format number as currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderDetails = createContext();

// Create custom hook to check if we are inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotal(orderType, optionCounts) {
  let optionCount = 0;

  for (const count of optionCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // Update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    // function updateItemCount(itemName, newItemCount, optionType) {
    //   setOptionCounts((prevState) => {
    //     // Get option Map and make a copy
    //     const { [optionType]: optionMap } = prevState;
    //     const newOptionMap = new Map(optionMap);

    //     // Update the copied Map
    //     newOptionMap.set(itemName, parseInt(newItemCount));

    //     // Create new object with the old optionCounts plus new Map
    //     const newOptionCounts = { ...prevState };
    //     newOptionCounts[optionType] = newOptionMap;

    //     return newOptionCounts;
    //   });
    // }

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
