// material-ui
import { Skeleton, Box } from "@mui/material";

// ==============================|| SKELETON IMAGE CARD ||============================== //

const SkeletonDataTable = ({ ...others }) => (
  <Box
    sx={{
      height: "max-content",
    }}
  >
    {[...Array(10)].map((i, a) => (
      <Box
        style={{
          display: "flex",
          width: "90vw",
          justifyContent: "space-between",
        }}
        key={`${i} + ${a} + ${Math.random()}`}
      >
        <Skeleton
          variant="reactangle"
          width={"15vw"}
          animation="wave"
          height={10}
          sx={{ my: 2, mx: 1 }}
        />
        <Skeleton
          variant="reactangle"
          width={"15vw"}
          animation="wave"
          height={10}
          sx={{ my: 2, mx: 1 }}
        />
        <Skeleton
          variant="reactangle"
          width={"15vw"}
          animation="wave"
          height={10}
          sx={{ my: 2, mx: 1 }}
        />
        <Skeleton
          variant="reactangle"
          width={"15vw"}
          animation="wave"
          height={10}
          sx={{ my: 2, mx: 1 }}
        />
        <Skeleton
          variant="reactangle"
          width={"15vw"}
          animation="wave"
          height={10}
          sx={{ my: 2, mx: 1 }}
        />
        <Skeleton
          variant="reactangle"
          width={"15vw"}
          animation="wave"
          height={10}
          sx={{ my: 2, mx: 1 }}
        />
      </Box>
    ))}
  </Box>
);

export default SkeletonDataTable;
