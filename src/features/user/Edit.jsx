import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function UsuarioEdit() {
  const userFromStorage = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Buscar dados do usuário
  useEffect(() => {
    if (!userFromStorage) return;
  
    const fetchData = async () => {
      try {
        // Buscar dados do usuário
        const resUser = await fetch(`http://localhost:3000/api/users/${userFromStorage.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!resUser.ok) throw new Error("Erro ao buscar usuário");
  
        const data = await resUser.json();
        setUsuario(data);
        setNome(data.nome || "");
        setSobrenome(data.sobrenome || "");
        setEmail(data.email || "");
        setTelefone(data.telefone || "");
  
        // Buscar dados do endereço com id do usuário
        const resEndereco = await fetch(`http://localhost:3000/api/enderecos/${userFromStorage.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!resEndereco.ok) throw new Error("Erro ao buscar endereço");
  
        const endereco = await resEndereco.json();
        setMunicipio(endereco.municipio || "");
        setBairro(endereco.bairro || "");
        setRua(endereco.rua || "");
  
      } catch (err) {
        console.error(err);
        setMsg("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Envio do formulário
  // Envio do formulário
const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
  
    try {
      // Atualizar usuário
      const userRes = await fetch(`http://localhost:3000/api/users/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, sobrenome, email, telefone }),
      });
  
      if (!userRes.ok) throw new Error("Erro ao atualizar usuário");
  
      // Atualizar endereço
      const enderecoRes = await fetch(`http://localhost:3000/api/enderecos/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ municipio, bairro, rua }),
      });
  
      if (!enderecoRes.ok) throw new Error("Erro ao atualizar endereço");
  
      setMsg("Dados atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      setMsg("Erro ao atualizar os dados.");
    }
  };
  

  if (!userFromStorage) return <p>Usuário não autenticado.</p>;
  if (loading) return <p>Carregando dados do usuário...</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="absolute top-0 bg-yellow-400 w-full p-5 pl-10 flex gap-4 items-center mb-4">
        <Link to='/'><button><FaArrowLeft /></button></Link>
        <h1 className="text-xl font-bold">Editar Perfil</h1>
      </div>

      <form onSubmit={handleSubmit} className="relative top-20 w-4/5">
        <h2 className="text-lg font-semibold mb-2">Informações do utilizador</h2>
        <p className="mb-4 text-sm text-gray-600">
          Atualize os dados pessoais do seu perfil. Certifique-se de que as informações estão corretas.
        </p>

        <label className="block font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block font-medium">Nome Completo</label>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="flex-1 border p-2 rounded"
            placeholder="Nome"
          />
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
            className="flex-1 border p-2 rounded"
            placeholder="Sobrenome"
          />
        </div>

        <label className="block font-medium">Telefone</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4"
        />

        <h2 className="text-lg font-semibold mt-6 mb-2">Endereço</h2>

        <label className="block font-medium">Município</label>
        <input
          type="text"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
        <div>
        <label className="block font-medium">Bairro</label>
        <input
          type="text"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        </div>

        <div>
        <label className="block font-medium">Casa / Porta</label>
        <input
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Atualizar Dados
        </button>
      </form>

      {msg && (
        <p className={`mt-4 ${msg.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}

export default UsuarioEdit;