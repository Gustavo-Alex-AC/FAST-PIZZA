import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCartOnServer, getCart } from "./CartSlice";

function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const nome = useSelector((state) => state.user.nome);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Voltar ao cardápio</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Seu carinho, {nome}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Pedir pizza
        </Button>

        <Button
          type="secondary"
          onClick={() => dispatch(clearCartOnServer(userId))}
        >
          Limpar carinho
        </Button>
      </div>
    </div>
  );
}

export default Cart;
