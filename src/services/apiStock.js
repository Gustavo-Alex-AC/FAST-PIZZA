import axios from "axios";

const apiStock = axios.create({
  baseURL: "http://localhost:3000/api/stocks", // ou a URL da sua API se estiver online
});

export async function updatePizzaStock(pizzaId, soldOut) {
  try {
    const res = await apiStock.put(`/pizzas/${pizzaId}/stock`, { soldOut });
    return res.data;
  } catch (error) {
    console.error("Erro ao atualizar o stock:", error);
    throw error;
  }
}
export async function fetchPizzas() {
    try {
      const res = await axios.get("http://localhost:3000/api/pizzas");
      return res.data;
    } catch (error) {
      console.error("Erro ao buscar pizzas:", error);
      throw error;
    }
  }