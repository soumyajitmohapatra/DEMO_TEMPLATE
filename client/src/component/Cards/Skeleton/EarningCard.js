// material-ui
import { CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { styled, useTheme } from "@mui/material/styles";
import MainCard from "../../../component/Cards/MainCard";

// ==============================|| SKELETON - EARNING CARD ||============================== //
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#1b1b1b",
  overflow: "hidden",
  position: "relative",
  margin: "1rem 0",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: "#302f2f",
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: "#302f2f",
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));
const EarningCard = () => (
  <CardWrapper>
    <CardContent>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Skeleton variant="rectangular" width={44} height={44} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" width={34} height={34} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" height={30} />
        </Grid>
      </Grid>
    </CardContent>
  </CardWrapper>
);

export default EarningCard;
