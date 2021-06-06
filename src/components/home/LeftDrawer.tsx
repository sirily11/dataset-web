import React from "react";
import { DatasetApp } from "../dataset_app/base_dataset_app";
import { useLocation, useHistory } from "react-router-dom";
import { createStyles, Drawer, makeStyles, Theme } from "@material-ui/core";
import { config } from "../../config/config";
import { List, ListItem, ListItemIcon, Tooltip } from "@material-ui/core";
import { DatasetAppContext } from "./SelectedAppContext";

interface Props {
  apps: DatasetApp<any, any>[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: config.drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: config.drawerWidth,
    },
  })
);

export default function LeftDrawer(props: Props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { apps } = props;
  const { selectedApp } = React.useContext(DatasetAppContext);

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <List>
        {apps.map((a, index) => (
          <Tooltip title={a.getTitle()} key={a.getTitle()}>
            <ListItem
              button
              selected={selectedApp === a}
              onClick={() => {
                history.push(a.getPath());
              }}
            >
              <ListItemIcon>{a.getIcon()}</ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
