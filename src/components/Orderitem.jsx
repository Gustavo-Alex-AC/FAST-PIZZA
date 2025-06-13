import PropTypes from "prop-types";

const OrderItem = ({ pedido, onUpdate, abrirModalPagamento }) => {
  const { id, estado, usuario, endereco } = pedido;

  const emPendente = estado === "pendente";
  const emRota     = estado === "em rota";
  const entregueOuCancelado = estado === "entregue" || estado === "cancelado";

  return (
    <div className="mb-4 rounded border p-4 shadow">
      <div className="font-semibold">
        #{id} – {usuario.nome}
      </div>

      <div className="text-sm">
        {endereco.rua}, {endereco.bairro}, {endereco.municipio}
      </div>

      <div className="mb-2 text-sm">
        Status: <span className="font-medium">{estado}</span>
      </div>

      {!entregueOuCancelado && (
        <div className="flex flex-col gap-2">
          {/* De pendente → Em rota */}
          {emPendente && (
            <button
              onClick={() => onUpdate(id, "em rota")}
              className="rounded bg-yellow-400 px-3 py-1"
            >
              Marcar como Em Rota
            </button>
          )}

          {/* De pendente ou em rota → Entregar (abre modal) */}
          {(emPendente || emRota) && (
            <button
              onClick={() => abrirModalPagamento(pedido)}
              className="rounded bg-green-500 px-3 py-1 text-white"
            >
              Marcar como Entregue
            </button>
          )}

          {/* Cancelar só quando ainda pendente */}
          {emPendente && (
            <button
              onClick={() => onUpdate(id, "cancelado")}
              className="rounded bg-red-500 px-3 py-1 text-white hidden"
            >
              Cancelar pedido
            </button>
          )}
        </div>
      )}
    </div>
  );
};

OrderItem.propTypes = {
  pedido: PropTypes.shape({
    id: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired,
    usuario: PropTypes.shape({ nome: PropTypes.string.isRequired }).isRequired,
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
