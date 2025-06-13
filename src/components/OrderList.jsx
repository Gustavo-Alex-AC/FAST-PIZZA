import PropTypes from "prop-types";
import OrderItem from "./OrderItem";

const OrderList = ({ pedidos, onUpdate, abrirModalPagamento }) => {
  return (
    <div className="grid gap-4">
      {pedidos.map((pedido) => (
        <OrderItem
          key={pedido.id}
          pedido={pedido}
          onUpdate={onUpdate}
          abrirModalPagamento={abrirModalPagamento}
        />
      ))}
    </div>
  );
};

OrderList.propTypes = {
  pedidos: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  abrirModalPagamento: PropTypes.func.isRequired,
};

export default OrderList;
