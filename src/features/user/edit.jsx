import { useEffect, useState } from "react";
import axios from "axios";

function EditPerfil() {
  const [userId, setUserId] = useState(null);
  const [enderecoId, setEnderecoId] = useState(null);

  const [usuario, setUsuario] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
  });

  const [endereco, setEndereco] = useState({
    bairro: "",
    casa: "",
    municipio: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const userData = JSON.parse(userStr);
      setUserId(userData.id || null);

      try {
        // 👇 Substituindo fetch por axios.get
        const res = await axios.get(`/api/users/${userData.id}`);
        const freshUser = res.data;
        console.log("freshUser:", freshUser);

        setUsuario({
          nome: freshUser.nome || "",
          sobrenome: freshUser.sobrenome || "",
          telefone: freshUser.telefone || "",
          email: freshUser.email || "",
        });

        if (freshUser.endereco && freshUser.endereco.id) {
          setEnderecoId(freshUser.endereco.id);
          setEndereco({
            bairro: freshUser.endereco.bairro || "",
            casa: freshUser.endereco.casa || "",
            municipio: freshUser.endereco.municipio || "",
          });
        } else {
          setEnderecoId(null);
          setEndereco({
            bairro: "",
            casa: "",
            municipio: "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUser();
  }, []);
  function handleUsuarioChange(e) {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  async function salvarUsuario(e) {
    e.preventDefault();
  
    if (!userId) {
      console.error("ID do usuário não encontrado.");
      return;
    }
  
    try {
      await axios.put(`/api/users/${userId}`, usuario);
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao atualizar usuário.");
    }
  }
  async function salvarEndereco(e) {
    e.preventDefault();
  
    try {
      if (enderecoId) {
        // Atualiza o endereço existente
        await axios.put(`/api/enderecos/${enderecoId}`, endereco);
      } else {
        // Cria um novo endereço (caso não exista)
        await axios.post("/api/enderecos", {
          ...endereco,
          user_id: userId,
        });
      }
  
      alert("Endereço salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      alert("Erro ao salvar endereço.");
    }
  }
  function handleEnderecoChange(e) {
    const { name, value } = e.target;
    setEndereco((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
        <form onSubmit={salvarUsuario} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={handleUsuarioChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={usuario.sobrenome}
              onChange={handleUsuarioChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={usuario.telefone}
              onChange={handleUsuarioChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleUsuarioChange}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Salvar Usuário
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Editar Endereço</h2>
        <form onSubmit={salvarEndereco} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Bairro</label>
            <input
              type="text"
              name="bairro"
              value={endereco.bairro}
              onChange={handleEnderecoChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Casa</label>
            <input
              type="text"
              name="casa"
              value={endereco.casa}
              onChange={handleEnderecoChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Município</label>
            <input
              type="text"
              name="municipio"
              value={endereco.municipio}
              onChange={handleEnderecoChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Salvar Endereço
          </button>
        </form>
      </section>
    </div>
  );
}

export default EditPerfil;
