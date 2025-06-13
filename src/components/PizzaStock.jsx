import { useEffect, useState } from "react";
import { fetchPizzas, updatePizzaStock } from "../services/apiStock";


const PizzaStockList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas()
      .then(setPizzas)
      .catch(() => alert("Erro ao carregar pizzas"))
      .finally(() => setLoading(false));
  }, []);

  const toggleDisponibilidade = async (pizzaId, currentStatus) => {
    try {
      const novoStatus = !currentStatus;
      await updatePizzaStock(pizzaId, novoStatus);
      setPizzas((prev) =>
        prev.map((pizza) =>
          pizza.id === pizzaId ? { ...pizza, soldOut: novoStatus } : pizza
        )
      );
    } catch (err) {
      alert("Erro ao atualizar stock");
    }
  };

  if (loading) return <p>Carregando pizzas...</p>;

  return (
    <div className="space-y-4">
      {pizzas.map((pizza) => (
        <div
          key={pizza.id}
          className="border p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-lg">{pizza.name}</h3>
            <p className="text-sm">
              Status:{" "}
              <span className={pizza.soldOut ? "text-red-500" : "text-green-600"}>
                {pizza.soldOut ? "Indisponível" : "Disponível"}
              </span>
            </p>
          </div>
          <button
  onClick={() => toggleDisponibilidade(pizza.id, pizza.soldOut)}
  className={`px-3 py-1 rounded text-white font-medium transition-colors duration-200
    ${pizza.soldOut ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
>
  {pizza.soldOut ? "Marcar como disponível" : "Marcar como indisponível"}
</button>

        </div>
      ))}
    </div>
  );
};

export default PizzaStockList;
