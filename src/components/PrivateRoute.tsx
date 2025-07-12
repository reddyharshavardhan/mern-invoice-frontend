import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.user.token);
  if (!token) return <Navigate to="/" />;
  return <>{children}</>;
};
export default PrivateRoute;