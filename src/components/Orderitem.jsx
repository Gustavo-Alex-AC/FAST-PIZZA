import PropTypes from "prop-types";

const OrderItem = ({ pedido, onUpdate, abrirModalPagamento }) => {
  return (
    <div className="mb-4 rounded border p-4 shadow">
      <div className="font-semibold">
        #{pedido.id} - {pedido.usuario.nome}
      </div>
      <div className="text-sm">
        {pedido.endereco.rua}, {pedido.endereco.bairro},{" "}
        {pedido.endereco.municipio}
      </div>
      <div className="mb-2 text-sm">
        Status: <span className="font-medium">{pedido.estado}</span>
      </div>
      <div className="flex flex-col gap-2">
        {pedido.estado === "pendente" && (
          <button
            onClick={() => onUpdate(pedido.id, "em rota")}
            className="bg-yellow-400 px-3 py-1 rounded"
          >
            Marcar como Em Rota
          </button>
        )}

        {pedido.estado !== "entregue" && (
          <button
            onClick={() => abrirModalPagamento(pedido)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Marcar como Entregue
          </button>
        )}
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  pedido: PropTypes.shape({
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  abrirModalPagamento: PropTypes.func.isRequired,
};

export default OrderItem;
