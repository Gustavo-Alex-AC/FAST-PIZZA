import { useLoaderData, useFetcher } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import Button from "../../ui/Button";

import { useSelector } from "react-redux";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  //const nome = useSelector((state) => state.user.nome);
  const user = useSelector((state) => state.user);

  const nome = user.nome;

  const {
    id,
    estado,
    total,
    data, // data do pedido
    itens, // ✅ renamed from 'carrinho'
    endereco,
  } = order;

  const deliveryIn = calcMinutesLeft(data);
  const isCancelling = fetcher.state === "submitting";

  return (
    <div className="space-y-8 px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Pedido #{id} - {nome}
        </h2>

        <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
          {estado}
        </span>
      </div>

      <div className="text-sm text-stone-700">
        <p>
          <span className="font-medium">Endereço:</span> {endereco?.bairro},
          {endereco?.rua}
        </p>
        <p>
          {endereco?.municipio}, {endereco?.provincia}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Encomenda feita há ${deliveryIn} minutos`
            : "Pedido processado"}
        </p>
        <p className="text-xs text-stone-500">
          (Data do pedido: {formatDate(data)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {itens.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="font-bold">Total a pagar: {formatCurrency(total)}</p>
      </div>

      {estado !== "cancelado" && (
        <fetcher.Form method="PATCH" action={`/order/${id}/cancel`}>
          {/* <Button type="secondary" disabled={isCancelling}>
            {isCancelling ? "Cancelando..." : "Cancelar Pedido"}
          </Button> */}
          <Button
            type="secondary"
            disabled={isCancelling}
            onClick={() => {
              if (typeof window.gtag === "function") {
                window.gtag("event", "pedidos_cancelados", {
                  order_id: id,
                  status: estado,
                  value: total,
                  currency: "AOA", // or "USD" based on your app
                });
              }
            }}
          >
            {isCancelling ? "Cancelando..." : "Cancelar Pedido"}
          </Button>
        </fetcher.Form>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
