import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import PropTypes from "prop-types";

function FormLogin({ showLogin, onClose }) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!showLogin) return null;

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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Palavra-passe</label>
            <input
              type="password"
              placeholder="Digite sua palavra-passe"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="text-blue-600 hover:underline"
          >
            Criar conta
          </button>
        </div>
      </div>

      {/* Modal de Criar Conta */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2">Criar Conta</h3>
            <p className="text-sm text-gray-600">Aqui vai o formulário de criação de conta...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 🧠 PropTypes para validação
FormLogin.propTypes = {
    showLogin: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default FormLogin;
