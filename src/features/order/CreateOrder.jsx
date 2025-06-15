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
  const user = useSelector((state) => state.user);
  //const nome = useSelector((state) => state.user.nome);
  //const isLogged = useSelector((state) => state.user.isAuthenticated);
  const userId = user.id;
  const cart = useSelector((state) => getCart(state, userId));

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

        <Button
          type="primary"
          disabled={isSubmitting}
          onClick={() => {
            if (typeof window.gtag === "function") {
              window.gtag("event", "pedidos_finalizados", {
                value: totalCartPrice,
                currency: "AOA", // or "USD"
              });
            }
          }}
        >
          {isSubmitting
            ? "A processar pedido..."
            : `Finalizar por ${formatCurrency(totalCartPrice)}`}
        </Button>

        {/* <Button type="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "A processar pedido..."
            : `Finalizar por ${formatCurrency(totalCartPrice)}`}
        </Button> */}
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    id_usuario: data.userId,
    total: parseFloat(data.total),
    carrinho: JSON.parse(data.cart),
  };

  // 🔹 Access the authenticated user's data
  const state = store.getState();
  const user = state.user;
  const userEmail = user.email;
  const userNome = user.nome;

  try {
    const newOrder = await createOrder(order);
    const carrinhoParaEmail = [...order.carrinho];

    console.log("Novo pedido criado:", carrinhoParaEmail);
    // 🔹 Send confirmation email
    await fetch("http://localhost:3000/api/send-order-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        nome: userNome,
        orderId: newOrder.id,
        total: order.total,
        itens: carrinhoParaEmail,
      }),
    });

    // 🔹 Clear cart after sending email
    store.dispatch(clearCartOnServer(order.id_usuario));

    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw Error("Erro ao criar pedido");
  }
}
