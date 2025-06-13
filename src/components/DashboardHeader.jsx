import PropTypes from "prop-types";
import logo from "../assets/logo.svg";

function DashboardHeader({ pedidos = [] }) {
    const totalPorEstado = pedidos.reduce(
      (acc, p) => {
        acc[p.estado] += 1;
        return acc;
      },
      { pendente: 0, "em rota": 0, entregue: 0 }
    );
  
    return (
      <header className="flex flex-col md:flex-row gap-4 items-start md:items-center px-10 p-2">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-16" />
          <p className="uppercase font-bold text-2xl">Painel de Controle</p>
        </div>
        <div className="flex gap-4 text-sm md:ml-auto text-gray-700">
          <span>Pendentes: {totalPorEstado.pendente}</span>
          <span>Em rota: {totalPorEstado["em rota"]}</span>
          <span>Entregues: {totalPorEstado.entregue}</span>
        </div>
      </header>
    );
  }
  

DashboardHeader.propTypes = {
  pedidos: PropTypes.arrayOf(
    PropTypes.shape({
      estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DashboardHeader;
