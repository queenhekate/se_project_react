import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  anonymous = false,
  isLoggedIn,
  isLoggedInLoading,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";
  if (isLoggedInLoading) return null;

  //const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
