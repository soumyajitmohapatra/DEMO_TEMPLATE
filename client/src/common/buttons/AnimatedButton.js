import React from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

function AnimatedButton(props) {
  return (
    <motion.div
      whileHover={{ scale: props.disabled ? 1 : 1.05 }}
      whileTap={{ scale: props.disabled ? 1 : 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button {...props}>{props.buttonTitle}</Button>
      {props?.loading && (
        <CircularProgress
          size={24}
          color="secondary"
          sx={{
            position: "relative",
            right: "4.2rem",
            top: "1rem",
          }}
        />
      )}
    </motion.div>
  );
}

export default AnimatedButton;
