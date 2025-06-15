import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader"; // 👈 ajuste o caminho conforme sua estrutura

function AdminRoute() {
  const { isAuthenticated, tipo, hydrated } = useSelector((s) => s.user);

  if (!hydrated) return <Loader />; // espera o Redux ser hidratado

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (tipo !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default AdminRoute;
