import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/logoWhite.svg";

function DashboardHeader({ abaAtiva, setAbaAtiva }) {
  const { isAuthenticated, tipo } = useSelector((s) => s.user);

  return (
    <header className="bg-yellow-400 shadow-md py-4 px-10 sticky top-0 z-50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Logo + título */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-14" />
          <p className="uppercase font-bold text-2xl text-white">
            Painel de Controle
          </p>
        </div>

        {/* Menu de seções */}
        <ul className="flex gap-6 text-sm md:text-base font-semibold text-gray-700">
          <li
            className={`cursor-pointer px-2 py-1 rounded ${
              abaAtiva === "entregas"
                ? "bg-white text-yellow-600 shadow"
                : "hover:text-yellow-800"
            }`}
            onClick={() => setAbaAtiva("entregas")}
          >
            Entregas
          </li>
          <li
            className={`cursor-pointer px-2 py-1 rounded ${
              abaAtiva === "stock"
                ? "bg-white text-yellow-600 shadow"
                : "hover:text-yellow-800"
            }`}
            onClick={() => setAbaAtiva("stock")}
          >
            Stock
          </li>

          {/* Link para painel logístico visível apenas para admins logados */}
          {isAuthenticated && tipo === "admin" && (
            <li>
              <Link
                to="/logistica"
                className="px-2 py-1 text-yellow-900 hover:underline"
              >
                Painel Logística
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  abaAtiva: PropTypes.string.isRequired,
  setAbaAtiva: PropTypes.func.isRequired,
};

export default DashboardHeader;
