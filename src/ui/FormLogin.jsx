import { FaSignInAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

function FormLogin({ showLogin, onClose }) {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ email: "", senha: "" });
  const [errorMsg, setError]  = useState("");

  const status = useSelector((state) => state.user.status);

  if (!showLogin) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await dispatch(loginUser(form));

      if (loginUser.fulfilled.match(result)) {
        const { tipo } = result.payload;   // <-- vem do backend

        onClose();
        setForm({ email: "", senha: "" });

        // redireciona conforme o tipo
        navigate(tipo === "admin" ? "/logistica" : "/");
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch {
      setError("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
              E‑mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Palavra‑passe
            </label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-center text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 font-medium text-white transition hover:bg-yellow-700 disabled:opacity-60"
          >
            <FaSignInAlt />
            {status === "loading" ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Ainda não tem conta?{" "}
          <Link to="/user" className="text-blue-600 hover:underline">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}

FormLogin.propTypes = {
  showLogin: PropTypes.bool.isRequired,
  onClose:    PropTypes.func.isRequired,
};

export default FormLogin;
