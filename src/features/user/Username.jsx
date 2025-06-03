import { useState, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

function Username() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    console.log(localStorage.getItem("user"));
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(); // ou redirecionar para login
  }

  return (
    <div className="relative text-sm font-semibold flex gap-4 items-center" ref={menuRef}>
      <p className="cursor-pointer select-none">
        {user ? `${user.nome} ${user.sobrenome}` : "Carregando..."}
      </p>
      <div onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 cursor-pointer select-none">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
          <FaRegUser className="text-1xl text-yellow-900" />
        </div>
        <IoIosArrowDown className="text-1xl text-gray-50" />
      </div>

      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-10">
          <Link to="/edit">
          <button className="block w-full px-4 py-2 text-left hover:bg-yellow-100">
            Editar Perfil
          </button>
          </Link>
          <button className="block w-full px-4 py-2 text-left hover:bg-yellow-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Username;
