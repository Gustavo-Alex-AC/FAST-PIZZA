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

export async function getCart() {
  const res = await fetch(`${API_URL_I}/carrinho`);
  if (!res.ok) throw new Error();
  const data = await res.json();
  return data;
}

export async function addToCart(item) {
  const res = await fetch(`${API_URL_I}/carrinho`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pizzaId: item.pizzaId,
      quantity: item.quantity,
    }),
  });
  if (!res.ok) throw new Error("Erro ao adicionar item");
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

export async function clearCart() {
  const res = await fetch(`${API_URL_I}/carrinho`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao limpar o carrinho");
}

// Pedidos

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
