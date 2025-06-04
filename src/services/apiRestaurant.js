const API_URL = "https://react-fast-pizza-api.onrender.com/api";
const API_URL_I = "http://localhost:3000/api";

// Menu
// export async function getMenu() {
//   const res = await fetch(`${API_URL}/menu`);

//   // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
//   if (!res.ok) throw Error("Failed getting menu");

//   const { data } = await res.json();
//   return data;
// }

export async function getMenu() {
  try {
    const res = await fetch(`${API_URL_I}/pizzas`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data;
  } catch {
    // fallback para a API online
    const res = await fetch(`${API_URL}/menu`);
    if (!res.ok) throw Error("Failed getting menu");
    const { data } = await res.json();
    return data;
  }
}

// Carrinho
export async function getCart(userId) {
  const res = await fetch(`${API_URL_I}/carrinho/${userId}`);
  if (!res.ok) throw new Error("Erro ao buscar carrinho");
  return await res.json();
}

// export async function getCart({ userId }) {
//   const res = await fetch(`${API_URL_I}/carrinho/${userId}`);
//   if (!res.ok) throw new Error();
//   const data = await res.json();
//   return data;
// }

export async function addToCart(item) {
  const res = await fetch(`${API_URL_I}/carrinho`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pizzaId: item.pizzaId,
      quantity: item.quantity,
      userId: item.userId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Erro ao adicionar item");
  }

  return await res.json(); // Retorna a resposta caso precise no Redux
}

export async function updateCartItem(pizzaId, quantity) {
  const res = await fetch(`${API_URL_I}/carrinho/${pizzaId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar quantidade");
}

export async function deleteCartItem(pizzaId) {
  const res = await fetch(`${API_URL_I}/carrinho/${pizzaId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao apagar item");
}

export async function clearCart(userId) {
  const res = await fetch(`${API_URL_I}/carrinho/limpar/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Detalhes do erro:", error);
    throw new Error("Erro ao limpar o carrinho");
  }
}

// Pedidos

// 🔍 Obter pedido por ID
export async function getOrder(id) {
  const res = await fetch(`${API_URL_I}/pedidos/${id}`);
  if (!res.ok) throw Error(`Não foi possível encontrar o pedido #${id}`);

  const data = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL_I}/pedidos`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao criar o pedido");
    }

    const data = await res.json();

    // Fix is here ⬇
    return { id: data.pedidoId };
  } catch (err) {
    console.error("Falha ao criar o pedido:", err);
    throw err;
  }
}

// ✏️ Atualizar estado do pedido (por exemplo, de 'pendente' para 'entregue')
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL_I}/pedidos/${id}`, {
      method: "PUT", // Usamos PUT no controller, não PATCH
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("Erro ao atualizar o pedido");
  } catch (err) {
    throw Error("Falha ao atualizar o pedido");
  }
}
