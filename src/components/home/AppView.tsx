import {
  createMuiTheme,
  createStyles,
  CssBaseline,
  Hidden,
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
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

interface Props {
  apps: DatasetApp<any, any>[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      [theme.breakpoints.up("md")]: {
        marginLeft: config.drawerWidth,
        padding: theme.spacing(3),
      },
      marginTop: 50,
      flexGrow: 1,

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
    type: "light",
    primary: lightBlue,
  },
});

export default function AppView(props: Props) {
  const { apps } = props;
  const classes = useStyles();
  const desktopBreakpoints: Breakpoint[] = ["xs", "sm"];
  const mobileBreakpoints: Breakpoint[] = ["md", "lg", "xl"];

  return (
    <div style={{ overflowY: "hidden" }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <DatasetAppProvider apps={apps}>
            <div>
              <AppAppBar />
              <AppBackdrop />
              <Hidden only={desktopBreakpoints} implementation="css">
                <LeftDrawer apps={apps} />
              </Hidden>

              <div className={classes.content}>
                <Switch>
                  {apps.map((a, i) =>
                    a.getAppProvider({
                      children: (
                        <div key={`path-${i}`}>
                          <Hidden
                            only={desktopBreakpoints}
                            implementation="css"
                          >
                            <Route path={a.getDetailPath().desktop} exact>
                              {a.renderLists()}
                            </Route>
                          </Hidden>
                          <Hidden only={mobileBreakpoints} implementation="css">
                            <Route path={a.getPath()} exact>
                              {a.renderMobileLists()}
                            </Route>
                            <Route path={a.getDetailPath().mobile} exact>
                              {a.renderMobileDetail()}
                            </Route>
                          </Hidden>
                        </div>
                      ),
                    })
                  )}
                </Switch>
              </div>
            </div>
          </DatasetAppProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}
