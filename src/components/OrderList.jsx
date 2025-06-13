import OrderItem from "./Orderitem";
import PropTypes from "prop-types";

const OrderList = ({ pedidos, onUpdate }) => {
  return (
    <div>
      {pedidos.map((pedido) => (
        <OrderItem key={pedido.id} pedido={pedido} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

OrderList.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      estado: PropTypes.string.isRequired,
      usuario: PropTypes.shape({
        nome: PropTypes.string.isRequired,
      }).isRequired,
      endereco: PropTypes.shape({
        rua: PropTypes.string.isRequired,
        bairro: PropTypes.string.isRequired,
        municipio: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderList;
