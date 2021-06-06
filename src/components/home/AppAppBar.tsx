import { createStyles, InputBase, makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import React from "react";
import { config } from "../../config/config";
import { DatasetAppContext } from "./SelectedAppContext";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${config.drawerWidth}px)`,
      marginLeft: config.drawerWidth,
    },

    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "28ch",
        "&:focus": {
          width: "34ch",
        },
      },
    },
  })
);

export default function AppAppBar() {
  const classes = useStyles();
  const { selectedApp } = React.useContext(DatasetAppContext);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          Material-UI
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={`Search for ${selectedApp?.getTitle()}`}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
