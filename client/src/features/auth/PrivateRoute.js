import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Layout from "../../Layout";
import { selectLoadingState } from "./authSlice";
import Lottie from "react-lottie";
import robot from "../../assets/lotties/robot.json";
import { AnimatePresence, motion } from "framer-motion";

const PrivateRoute = () => {
  const location = useLocation();
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const isLoading = useSelector(selectLoadingState);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: robot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
  };
  if (isLoading)
    return (
      <AnimatePresence mode={"wait"}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition }}
          exit={{ scale: 0.5, opacity: 0, transition }}
          enter={{
            scale: 1,
            opacity: 1,
            transition,
          }}
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions} height={200} width={200} />
          <blockquote
            style={{
              borderLeft: "5px solid #ccc",
              margin: "1.5em 10px",
              padding: "0.2rem 10px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                fontWeight: "500px",
                textAlign: "center",
                fontStyle: "italic",
                margin: "auto",
              }}
            >
              "User's session has expired, Initiating logout."
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "500px",
                textAlign: "right",
                fontStyle: "italic",
                margin: "auto",
              }}
            >
              ~developer
            </p>
          </blockquote>
        </motion.div>
      </AnimatePresence>
    );
  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};
export default PrivateRoute;
