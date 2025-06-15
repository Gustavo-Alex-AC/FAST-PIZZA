import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { isAuthenticated, tipo } = useSelector((s) => s.user);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (tipo !== "admin")    return <Navigate to="/" replace />;
  return <Outlet />;
}

export default AdminRoute;
