import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import OrderList from "../components/OrderList";
import PizzaStockList from "../components/PizzaStock";
import PagamentoModal from "../components/PagamentoModal";
import api from "../services/apiLogistics";

const LogisticsDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("entregas");
  const [pagamentoModal, setPagamentoModal] = useState({ aberto: false, pedido: null });

  const fetchPedidos = async () => {
    try {
      const res = await api.get("/pedidos");
      setPedidos(res.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarEstado = async (id, novoEstado) => {
    try {
      await api.put(`/pedidos/${id}`, { estado: novoEstado });
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: novoEstado } : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  const abrirModalPagamento = (pedido) => {
    setPagamentoModal({ aberto: true, pedido });
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  if (loading) return <p className="p-4">Carregando pedidos...</p>;

  return (
    <div>
      <DashboardHeader
        pedidos={pedidos}
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
      />

      <main className="p-10 w-full">
        {abaAtiva === "entregas" && (
          <OrderList
            pedidos={pedidos}
            onUpdate={atualizarEstado}
            abrirModalPagamento={abrirModalPagamento}
          />
        )}

        {abaAtiva === "stock" && (
          <PizzaStockList />
        )}

        {pagamentoModal.aberto && (
          <PagamentoModal
            pedido={pagamentoModal.pedido}
            onClose={() => setPagamentoModal({ aberto: false, pedido: null })}
            onConfirm={() => fetchPedidos()}
          />
        )}
      </main>
    </div>
  );
};

export default LogisticsDashboard;
