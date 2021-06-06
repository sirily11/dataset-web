import {
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
import { DatasetAppProvider } from "./SelectedAppContext";
import AppAppBar from "./AppAppBar";
import AppBackdrop from "./AppBackdrop";

interface Props {
  apps: DatasetApp<any, any>[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginLeft: config.drawerWidth,
      marginTop: 50,
      flexGrow: 1,
      padding: theme.spacing(3),
      overflowY: "hidden",
    },
    toolbar: theme.mixins.toolbar,
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
  },
});

export default function AppView(props: Props) {
  const { apps } = props;
  const classes = useStyles();

  return (
    <div style={{ overflowY: "hidden" }}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <DatasetAppProvider apps={apps}>
            <div>
              <CssBaseline />
              <AppAppBar />
              <AppBackdrop />
              <LeftDrawer apps={apps} />
              <div className={classes.content}>
                <Switch>
                  {apps.map((a, i) => (
                    <Route path={a.getDetailPath()} key={`path-${i}`} exact>
                      {a.getAppProvider({ children: a.renderLists() })}
                    </Route>
                  ))}
                </Switch>
              </div>
            </div>
          </DatasetAppProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}
