import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../../../app/routes";
import { authStorage } from "../data/auth.storage";
import LoginPage from "./LoginPage";
import AdminLayout from "../../../components/layout/AdminLayout";

const AdminGate: React.FC = () => {
  const location = useLocation();
  const autenticado = authStorage.estaAutenticado();

  // Si NO está autenticado:
  if (!autenticado) {
    // Si entra exactamente a /admin, mostramos login
    if (location.pathname === ROUTES.ADMIN) {
      return <LoginPage />;
    }

    // Si intenta entrar a otra ruta privada, lo mandamos a /admin
    return <Navigate to={ROUTES.ADMIN} replace />;
  }

  // Si SÍ está autenticado, mostramos el layout admin
  return <AdminLayout />;
};

export default AdminGate;
