// src/components/PagamentoModal.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../services/apiLogistics"; // ajuste o caminho se necessário

const PagamentoModal = ({ pedido, onClose, onConfirm }) => {
  // Tipos de pagamento vindos do backend
  const [tipos, setTipos] = useState([]);
  // Tipo selecionado no modal
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  // Feedback de erro (opcional)
  const [erro, setErro] = useState("");

  /* -------------------- carregar tipos de pagamento -------------------- */
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        // 👉 garanta que o prefixo corresponda ao seu app.js
        const res = await api.get("/tipopagamento");
        setTipos(res.data); // [{id:1,nome:'cash'}, ...]
      } catch (err) {
        console.error("Erro ao buscar tipos de pagamento:", err);
        setErro("Não foi possível carregar as formas de pagamento.");
      }
    };

    fetchTipos();
  }, []);

  /* ----------------------- enviar pagamento + update -------------------- */
  const handleSubmit = async () => {
    setErro("");
    try {
      await api.post("/pagamentos", {
        metodo: tipoSelecionado.nome,          // "cash", etc.
        valor_pago: pedido.total ?? 0,         // valor do pedido
        pedidoId: pedido.id,
        tipoPagamentoId: tipoSelecionado.id,   // FK real
      });

      // muda estado do pedido para entregue
      await api.put(`/pedidos/${pedido.id}`, { estado: "entregue" });

      onConfirm();       // refetch na tela pai
      onClose();         // fecha modal
    } catch (err) {
      console.error("Erro ao criar pagamento:", err);
      setErro("Falha ao registrar pagamento.");
    }
  };

  /* ----------------------------- render UI ----------------------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Selecionar forma de pagamento</h2>

        {/* lista dos tipos */}
        <ul className="space-y-2">
          {tipos.map((tipo) => (
            <li key={tipo.id}>
              <button
                type="button"
                className={`w-full rounded p-2 text-left ${
                  tipoSelecionado?.id === tipo.id
                    ? "bg-yellow-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setTipoSelecionado(tipo)}
              >
                {tipo.nome}
              </button>
            </li>
          ))}
        </ul>

        {/* mensagem de erro (se ocorrer) */}
        {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}

        {/* ações */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!tipoSelecionado}
            className="rounded bg-green-600 px-4 py-1 text-white disabled:opacity-50"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

PagamentoModal.propTypes = {
  pedido: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total: PropTypes.number, // use total ou ajuste se tiver outro campo
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PagamentoModal;
