import { useState, useEffect } from "react";
import { GoSignIn } from "react-icons/go";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice"; // ajuste o caminho conforme seu projeto
import FormLogin from "../ui/FormLogin"; // ajuste se necessário
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/CartSlice";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const user = useSelector((state) => state.user.nome);
  const nome = useSelector((state) => state.user.nome); // verifica se está logado
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setShowLogin(false);
  }, []);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/"); // redireciona para a página inicial após logout
  };

  return (
    <>
      <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-white p-3 shadow">
        {!nome ? (
          <button
            onClick={() => {
              // Rastreia o clique no botão de login
              window.gtag &&
                window.gtag("event", "login_click", {
                  event_category: "User",
                  event_label: "Botão Entrar (Login)",
                });

              // Continua com a ação de mostrar o modal de login
              setShowLogin(true);
            }}
            className="flex items-center gap-2 font-medium text-yellow-600 hover:underline"
          >
            <GoSignIn className="text-xl text-yellow-600" />
            Entrar
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-medium text-red-600 hover:underline"
          >
            <FaSignOutAlt className="text-xl text-red-600" />
            Sair
          </button>
        )}
      </div>

      <FormLogin showLogin={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

export default Signin;

/* <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-2 font-medium text-yellow-600 hover:underline"
          >
            <GoSignIn className="text-xl text-yellow-600" />
            Entrar
          </button> */
