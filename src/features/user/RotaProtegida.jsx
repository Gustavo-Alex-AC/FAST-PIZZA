import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../ui/Loader";

export default function RotaProtegida({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // ou "/login", dependendo do seu fluxo
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    <Loader />;
    return null;
  }

  return <>{children}</>;
}

RotaProtegida.propTypes = {
  children: PropTypes.node.isRequired,
};
