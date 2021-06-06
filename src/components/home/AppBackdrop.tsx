import {
  Backdrop,
  CircularProgress,
  createMuiTheme,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { config } from "../../config/config";
import { DatasetApp } from "../dataset_app/base_dataset_app";
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import LeftDrawer from "./LeftDrawer";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { DatasetAppContext, DatasetAppProvider } from "./SelectedAppContext";
import AppAppBar from "./AppAppBar";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function AppBackdrop(props: Props) {
  const classes = useStyles();
  const { isLoading } = React.useContext(DatasetAppContext);

  return (
    <Backdrop open={isLoading} className={classes.backdrop}>
      <CircularProgress />
    </Backdrop>
  );
}
