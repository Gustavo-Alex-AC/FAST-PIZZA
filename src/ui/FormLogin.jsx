import { FaSignInAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Novo import para Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

function FormLogin({ showLogin, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const status = useSelector((state) => state.user.status);
  //const error = useSelector((state) => state.user.error);

  if (!showLogin) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const resultAction = await dispatch(loginUser(form));

      if (loginUser.fulfilled.match(resultAction)) {
        onClose(); // fecha o modal
        navigate("/"); // redireciona
        setForm({ email: "", senha: "" }); // limpa o formulário
      } else {
        setErrorMsg("Email ou senha incorretos."); // erro tratado no thunk
      }
    } catch (err) {
      setErrorMsg("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          Iniciar Sessão
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Palavra-passe
            </label>
            <input
              type="password"
              name="senha"
              placeholder="Sua senha"
              value={form.senha}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errorMsg && (
            <p className="mb-4 text-center text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 font-medium text-white transition hover:bg-yellow-700"
          >
            <FaSignInAlt />
            {status === "loading" ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Ainda não tem conta?{" "}
          <Link to="/user">
            <button type="button" className="text-blue-600 hover:underline">
              Criar conta
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

FormLogin.propTypes = {
  showLogin: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FormLogin;
