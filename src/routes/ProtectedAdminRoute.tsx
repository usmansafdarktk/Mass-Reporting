import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <Navigate to="/admin/home" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
