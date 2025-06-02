// src/features/order/CancelOrderAction.js
import { updateOrder } from "../../services/apiRestaurant";

export async function action({ params }) {
  const data = { estado: "cancelado" };
  await updateOrder(params.orderId, data);
  return null;
}
