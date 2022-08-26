import { useLocation, Navigate, Outlet } from "react-router-dom";
import Layout from "../../Layout";

const PrivateRoute = () => {
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};
export default PrivateRoute;
