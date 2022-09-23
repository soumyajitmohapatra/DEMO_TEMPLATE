import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonCircle, IoLockClosed } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

import { setCredentials } from "../../features/auth/authSlice";
import { device } from "../../styles/breakingPoints";
import { useLoginMutation } from "../../features/auth/authApiSlice";

function Login() {
  const transition = {
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96],
  };
  const element = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition,
    },
  };
  const card = {
    exit: { y: "0%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition,
    },
  };
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  // const from = location.state?.from?.pathname || "/";
  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
    setErrMsg("");
  }, []);
  const formik = useFormik({
    initialValues: {
      username: "sam",
      password: "password",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Username is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const userData = await login({ ...values }).unwrap();
        if (userData?.status === "success") {
          const accessToken = userData?.accessToken;
          dispatch(setCredentials({ user: userData?.data, accessToken }));
          navigate("/dashboard");
          // navigate(from, { replace: true });
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Invalid credential");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      }
    },
  });

  return (
    <Styles initial="exit" animate="enter" exit="exit" variants={card}>
      {isLoading ? (
        <CircularProgress size={68} color="secondary" />
      ) : (
        <>
          <div className="content">
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={element}
              className="text"
            >
              <h1>Log In</h1>
              <br />
              <h5>Please enter your credentials to continue.</h5>
            </motion.div>

            <form onSubmit={formik.handleSubmit}>
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                className="field"
                variants={element}
              >
                <IoPersonCircle
                  style={{ position: "absolute", bottom: "14px", left: "1rem" }}
                  size={20}
                />
                <input
                  ref={userRef}
                  placeholder="Enter Your Username"
                  id="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                />
              </motion.div>
              {formik.touched.username && formik.errors.username ? (
                <div className="error">
                  <p>{formik.errors.username}</p>
                </div>
              ) : null}
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={element}
                className="field"
              >
                <IoLockClosed
                  style={{ position: "absolute", bottom: "14px", left: "1rem" }}
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  {...formik.getFieldProps("password")}
                />
              </motion.div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={element}
                className="forgot-pass"
              >
                <Link to="/forgot-password">Forgot Password?</Link>
              </motion.div>
              <motion.div
                whileHover="hover"
                initial="initial"
                animate="enter"
                exit="exit"
                variants={{
                  ...element,
                  hover: { scale: 1.03, transition },
                }}
                whileTap={{ scale: 0.97 }}
              >
                <button type="submit">Login</button>
              </motion.div>
              <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                className="signup"
                variants={element}
              >
                Not a member?
                <Link to="/"> Register now</Link>
              </motion.div>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </form>
          </div>
        </>
      )}
    </Styles>
  );
}

export default Login;

const Styles = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00b4db; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 100vh;

  .content {
    width: 25rem;
    background: #ffff;
    border-radius: 8px;
    padding: 40px 30px;
    box-shadow: 0 22px 40px rgba(0, 0, 0, 0.5);
    @media ${device.tablet} {
      max-width: 18rem;
    }
  }
  .text {
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 0.5rem;
    h1 {
      font-size: 22px;
      font-weight: bold;
    }
    h3 {
      font-size: 18px;
      font-weight: bold;
    }
    p {
      font-size: 10px;
    }
  }
  .field {
    height: 50px;
    width: 100%;
    display: flex;
    position: relative;
    input {
      height: 100%;
      width: 100%;
      padding-left: 45px;
      font-size: 18px;
      outline: none;
      border: none;
      color: #595959;
      background: #dde1e7;
      border-radius: 8px;
      box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
      &:focus ~ label {
        box-shadow: inset 2px 2px 5px #babecc, inset -1px -1px 2px #ffffff73;
      }
    }

    &:nth-child(2) {
      margin-top: 20px;
    }

    span {
      position: absolute;
      width: 50px;
      line-height: 50px;
      color: #595959;
    }

    label {
      position: absolute;
      top: 50%;
      left: 45px;
      pointer-events: none;
      color: #666666;
      transform: translateY(-50%);
    }

    .field input:focus ~ label {
      opacity: 0;
    }
  }

  .forgot-pass {
    text-align: left;
    margin: 10px 0 10px 5px;
    a {
      font-size: 16px;
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  button {
    margin: 15px 0;
    width: 100%;
    height: 50px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;
    background: #00b4db; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #0083b0,
      #00b4db
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #0083b0,
      #00b4db
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    &:focus {
      color: #3498db;
      box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
    }
  }

  .signup {
    font-size: 16px;
    color: #595959;
    margin: 10px 0;
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: #000;
      }
    }
  }
  .error {
    p {
      text-align: center;
      color: tomato;
    }
  }
`;
