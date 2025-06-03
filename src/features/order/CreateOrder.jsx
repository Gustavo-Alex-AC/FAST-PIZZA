import { Form, useNavigation, redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import {
  // clearCart,
  clearCartOnServer,
  getCart,
  getTotalCartPrice,
} from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import store from "../../Store"; // Uncomment if using store directly
//import { useDispatch } from "react-redux"; // Uncomment if dispatching from here

function CreateOrder() {
  // const dispatch = useDispatch();
  const userId = 2; // Replace with real user ID from state later if available

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Confirmar pedido</h2>

      <Form method="POST">
        {/* Hidden inputs must have a name or id to be valid */}
        <input type="hidden" name="userId" id="userId" value={userId} />
        <input
          type="hidden"
          name="cart"
          id="cart"
          value={JSON.stringify(cart)}
        />
        <input type="hidden" name="total" id="total" value={totalCartPrice} />

        <Button type="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "A processar pedido..."
            : `Finalizar por ${formatCurrency(totalCartPrice)}`}
        </Button>
      </Form>
    </div>
  );
}

export default CreateOrder;

// 🟢 Action Function
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    id_usuario: data.userId,
    total: parseFloat(data.total),
    carrinho: JSON.parse(data.cart),
  };

  try {
    const newOrder = await createOrder(order);

    // Optional: Clear cart if using Redux or API method
    store.dispatch(clearCartOnServer(order.id_usuario));

    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw Error("Erro ao criar pedido");
  }
}
