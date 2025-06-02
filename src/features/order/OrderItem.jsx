import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item }) {
  const { quantidade, nome_pizza, preco_unitario, ingredientes } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-bold">
          <span>{quantidade}&times;</span> {nome_pizza}
        </p>
        <p className="font-bold">
          {formatCurrency(preco_unitario * quantidade)}
        </p>
      </div>
      {ingredientes && (
        <p className="text-sm italic text-slate-500">{ingredientes}</p>
      )}
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    quantidade: PropTypes.number.isRequired,
    nome_pizza: PropTypes.string.isRequired,
    preco_unitario: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    ingredientes: PropTypes.string, // já vem como string do backend
  }).isRequired,
};

export default OrderItem;
