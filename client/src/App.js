import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
} from "react-router-dom";
import { lazy } from "react";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./features/auth/PrivateRoute";
import Login from "./views/Login";
import Loadable from "./component/Loadable";

const Dashboard = Loadable(lazy(() => import("./views/Dashboard")));
const SamplePage = Loadable(lazy(() => import("./views/SamplePage")));
const PageMissing = Loadable(lazy(() => import("./views/PageMissing")));

function App() {
  return (
    <Router>
      <AnimatePresence exitBeforeEnter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Root />}>
              {/* public routes */}
              <Route index element={<Public />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageMissing />} />
              {/* protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="sample-page" element={<SamplePage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;

const Root = () => {
  return <Outlet />;
};

const Public = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div>
      <header>
        <h1>Welcome to ADMIN TEMPLATE</h1>
      </header>
      <main>
        <p>
          Qui magna incididunt ut sit commodo pariatur veniam. Exercitation
          aliquip commodo esse deserunt sunt aute ut eu quis. Mollit dolor
          nostrud amet esse sint.
        </p>
        <p>&nbsp;</p>
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </div>
  );
};
