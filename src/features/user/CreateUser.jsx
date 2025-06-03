import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import animacao from "../../assets/pizza-delivery.json";

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
    <div className="flex w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-yellow-400">
        <Lottie
          style={{ width: 300, height: 300 }}
          animationData={animacao}
          loop={true}
        />
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex h-screen flex-col justify-center p-10"
        >
          <Link
            to="/"
            className="mb-10 w-auto bg-yellow-400 text-4xl font-bold tracking-widest"
          >
            Fast Pizza
          </Link>
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="mb-4 text-xs text-stone-600 md:text-base">
            Já tens uma conta?{" "}
            <Link to="/" className="text-blue-500 underline">
              Iniciar Sessão
            </Link>
          </p>

          <input
            type="text"
            name="nome"
            placeholder="Digite o seu nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="input mb-4 w-full p-4"
          />
          <input
            type="text"
            name="sobrenome"
            placeholder="Digite o seu Sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            required
            className="input mb-4 w-full p-4"
          />
          <div className="grid grid-rows-2">
            <input
              type="text"
              name="casa"
              placeholder="Digite o nº de casa/edifício"
              value={form.casa}
              onChange={handleChange}
              required
              className="input mb-4 w-full p-4"
            />
            <input
              type="text"
              name="bairro"
              placeholder="Digite o nome do bairro"
              value={form.bairro}
              onChange={handleChange}
              required
              className="input mb-4 w-full p-4"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="municipio"
                placeholder="Digite o seu município"
                value={form.municipio}
                onChange={handleChange}
                required
                className="input mb-4 w-full p-4"
              />
              <input
                type="text"
                name="telefone"
                placeholder="Digite o seu nº telefone"
                value={form.telefone}
                onChange={handleChange}
                required
                className="input mb-4 w-full p-4"
              />
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Digite o seu Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input mb-4 w-full p-4"
          />
          <input
            type="password"
            name="senha"
            placeholder="Digite a sua palavra-passe"
            value={form.senha}
            onChange={handleChange}
            required
            className="input mb-4 w-full p-4"
          />

          <button
            type="submit"
            className="w-auto rounded bg-red-500 p-4 text-center font-bold text-white"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
