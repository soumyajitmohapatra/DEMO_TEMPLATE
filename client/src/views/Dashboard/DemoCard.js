import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "../../component/Cards/MainCard";
import SkeletonEarningCard from "../../component/Cards/Skeleton/EarningCard";
import {
  IoBagHandle,
  IoEllipsisHorizontal,
  IoBookmark,
  IoTrendingUp,
  IoReload,
} from "react-icons/io5";
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#1b1b1b",
  overflow: "hidden",
  position: "relative",
  margin: "1rem 0",
  borderRadius: "8px",
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const DemoCard = ({ isLoading = true, data, reload = () => null }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1,
                      }}
                    >
                      <IoBagHandle />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        backgroundColor: theme.palette.secondary.dark,
                        color: theme.palette.secondary[200],
                        zIndex: 1,
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <IoEllipsisHorizontal />
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          reload();
                        }}
                      >
                        <IoReload sx={{ mr: 1.75 }} />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        {/* <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data */}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        {/* <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export */}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        {/* <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File */}
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      $500.00
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark,
                      }}
                    >
                      <IoTrendingUp />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.secondary[200],
                  }}
                >
                  {data ? data : " Demo Card"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

DemoCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default DemoCard;
