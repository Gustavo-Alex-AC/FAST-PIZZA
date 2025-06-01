import { useState, useEffect } from "react";
import { GoSignIn } from "react-icons/go";
import FormLogin from "./FormLogin"; // Ajuste o caminho se necessário

function Signin() {
  const [showLogin, setShowLogin] = useState(false);

  // Opcional: se já existir token, não abra o modal automaticamente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowLogin(false);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-2 bg-white p-3 rounded shadow cursor-pointer">
        
        <button
          onClick={() => setShowLogin(true)}
          className="text-yellow-600 font-medium hover:underline flex items-center gap-2"
        >
          <GoSignIn className="text-xl text-yellow-600" />
          Entrar
        </button>
      </div>

      <FormLogin showLogin={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

export default Signin;
