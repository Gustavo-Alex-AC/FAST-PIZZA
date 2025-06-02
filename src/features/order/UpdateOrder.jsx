import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useFetcher, redirect } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant"; // função PATCH

function UpdateOrder({ orderId }) {
  const fetcher = useFetcher();
  const isUpdating = fetcher.state === "submitting";

  return (
    <fetcher.Form method="PATCH" action={`/order/${orderId}`}>
      <Button type="primary" disabled={isUpdating}>
        {isUpdating ? "Atualizando..." : "Confirmar pedido"}
      </Button>
    </fetcher.Form>
  );
}

UpdateOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default UpdateOrder;

// 👇 Action usada na rota PATCH
export async function action({ params }) {
  const orderId = Number(params.orderId);

  try {
    await updateOrder(orderId, { status: "confirmado" });
    return redirect(`/order/${orderId}`);
  } catch (err) {
    throw new Error("Erro ao atualizar pedido");
  }
}
