import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  if (!authUser) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;
