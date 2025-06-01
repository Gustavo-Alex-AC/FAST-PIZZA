
import { FaSignInAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function FormLogin({ showLogin, onClose }) {

  

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [errorMsg, setErrorMsg] = useState("");

  // Se showLogin for false, não renderiza o modal
  if (!showLogin) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // limpa mensagem de erro

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: form.email,
          senha: form.senha,
        }
      );

      // Se chegar aqui, status foi 200. Destructure a resposta:
      const { token, usuario } = response.data;

      // 1) Armazena o token no localStorage (ou cookies, conforme necessidade)
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: usuario.id, nome: usuario.nome, email: usuario.email })
      );

      // 1) Fecha o modal imediatamente
      onClose();

      // 2) Redireciona para a página Home ("/") ou dashboard
      navigate("/");
    } catch (err) {
      console.error("Erro ao fazer login:", err.response || err.message);
      // Se for 401, mostra msg de credenciais inválidas
      if (err.response && err.response.status === 401) {
        setErrorMsg("Email ou senha incorretos.");
      } else {
        setErrorMsg("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  };


  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Iniciar Sessão</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={handleChange}
          required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Palavra-passe</label>
            <input
              type="password"
              name="senha"
              placeholder="Sua senha"
              value={form.senha}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMsg && (
          <p className="mb-4 text-red-600 text-sm text-center">{errorMsg}</p>
        )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            <FaSignInAlt />
            Entrar
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          Ainda não tem conta?{" "}
          <Link to="/user">
          <button
            type="button"
            className="text-blue-600 hover:underline"
          >
            Criar conta
          </button></Link>
        </div>
      </div>

      {/* Modal de Criar Conta */}
      
    </div>
  );
}

// 🧠 PropTypes para validação
FormLogin.propTypes = {
    showLogin: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default FormLogin;
