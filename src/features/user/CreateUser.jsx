import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import animacao from "../../assets/pizza-delivery.json";
import logoWhite from "../../assets/logo.svg";

import axios from "axios";

function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    casa: "",
    bairro: "",
    municipio: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        nome,
        sobrenome,
        casa,
        bairro,
        municipio,
        telefone,
        email,
        senha,
      } = form;

      await axios.post("http://localhost:3000/api/users/criar-com-endereco", {
        nome,
        sobrenome,
        telefone,
        email,
        senha,
        casa, // será tratado como rua no backend
        bairro,
        municipio,
      });

      alert("Usuário criado com sucesso!");

      setForm({
        nome: "",
        sobrenome: "",
        casa: "",
        bairro: "",
        municipio: "",
        telefone: "",
        email: "",
        senha: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao criar usuário:", error.message);
      if (error.response?.data?.erro) {
        console.error("Erro do servidor:", error.response.data.erro);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen">
  {/* Div da animação */}
  <div className="flex w-full sm:w-3/5 items-center justify-center bg-yellow-400 h-[300px] sm:h-screen">
    <Lottie
      style={{ width: 300, height: 300 }}
      animationData={animacao}
      loop
    />
  </div>

  {/* Formulário */}
  <div className="flex w-full sm:w-2/5 items-center justify-center bg-white p-6 sm:p-10">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col"
    >
      <div className="flex gap-4 items-center mb-6">
        <Link to="/" className="w-auto">
          <img src={logoWhite} alt="Logo" className="h-16" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="text-xs text-stone-600 md:text-sm">
            Já tens uma conta?{" "}
            <Link to="/" className="text-blue-500 underline">
              Iniciar Sessão
            </Link>
          </p>
        </div>
      </div>

      <input
        type="text"
        name="nome"
        placeholder="Digite o seu nome"
        value={form.nome}
        onChange={handleChange}
        required
        className="input mb-3 w-full p-3"
      />
      <input
        type="text"
        name="sobrenome"
        placeholder="Digite o seu Sobrenome"
        value={form.sobrenome}
        onChange={handleChange}
        required
        className="input mb-3 w-full p-3"
      />
      <input
        type="text"
        name="casa"
        placeholder="Digite o nº de casa/edifício"
        value={form.casa}
        onChange={handleChange}
        required
        className="input mb-3 w-full p-3"
      />
      <input
        type="text"
        name="bairro"
        placeholder="Digite o nome do bairro"
        value={form.bairro}
        onChange={handleChange}
        required
        className="input mb-3 w-full p-3"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          name="municipio"
          placeholder="Digite o seu município"
          value={form.municipio}
          onChange={handleChange}
          required
          className="input w-full p-3"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Digite o seu nº telefone"
          value={form.telefone}
          onChange={handleChange}
          required
          className="input w-full p-3"
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Digite o seu Email"
        value={form.email}
        onChange={handleChange}
        required
        className="input mt-3 mb-3 w-full p-3"
      />
      <input
        type="password"
        name="senha"
        placeholder="Digite a sua palavra-passe"
        value={form.senha}
        onChange={handleChange}
        required
        className="input mb-5 w-full p-3"
      />

      <button
        type="submit"
        className="w-full rounded bg-red-500 p-3 font-bold text-white hover:bg-red-600 transition"
      >
        Criar Conta
      </button>
    </form>
  </div>
</div>

  );
}

export default CreateUser;
