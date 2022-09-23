import React from "react";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

import EventCalandar from "../../component/Calandars/EventCalandar";
import DynamicDataTable from "../../component/DataTable/DynamicDataTable";
import { useGetDateQuery } from "./dashboardApiSlice";
import DemoCard from "./DemoCard";

function Dashboard() {
  const { data, isLoading, isSuccess, isError, error, refetch, isFetching } =
    useGetDateQuery();

  const transition = {
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96],
  };
  const card = {
    exit: { y: "0%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      transition,
    },
  };

  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          paddingBottom: "1rem",
        }}
      >
        <motion.div initial="exit" animate="enter" exit="exit" variants={card}>
          <EventCalandar />
        </motion.div>
      </Grid>
      <Grid item xs={12} md={4}>
        <motion.div initial="exit" animate="enter" exit="exit" variants={card}>
          <DemoCard
            isLoading={isLoading || isFetching}
            data={JSON.stringify(data?.data)}
            reload={refetch}
          />
        </motion.div>
        <motion.div initial="exit" animate="enter" exit="exit" variants={card}>
          <DemoCard isLoading={isLoading} />
        </motion.div>
      </Grid>
      <Grid item xs={12} md={12}>
        <motion.div initial="exit" animate="enter" exit="exit" variants={card}>
          <DynamicDataTable rows={data} />
        </motion.div>
      </Grid>
      <Grid item xs={12} md={8}>
        <motion.div initial="exit" animate="enter" exit="exit" variants={card}>
          <DemoCard isLoading={isLoading} />
        </motion.div>
      </Grid>
      <Grid item xs={12} md={4}>
        <motion.div initial="exit" animate="enter" exit="exit" variants={card}>
          <DemoCard isLoading={isLoading} />
        </motion.div>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
