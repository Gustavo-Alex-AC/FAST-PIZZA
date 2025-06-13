import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import OrderList from "../components/OrderList";
import api from "../services/apiLogistics"; // Assumindo que esse arquivo está correto

const LogisticsDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // Atualiza localmente
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado: novoEstado } : p
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  if (loading) return <p className="p-4">Carregando pedidos...</p>;

  return (
    <div>
      <DashboardHeader pedidos={pedidos} />
      <main className="p-10">
        <OrderList pedidos={pedidos} onUpdate={atualizarEstado} />
      </main>
    </div>
  );
};

export default LogisticsDashboard;
