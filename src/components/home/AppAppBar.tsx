import {
  ClickAwayListener,
  createStyles,
  InputBase,
  List,
  makeStyles,
  Paper,
  Popper,
} from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import React from "react";
import { config } from "../../config/config";
import { DatasetAppContext } from "./SelectedAppContext";
import SearchIcon from "@material-ui/icons/Search";
import { DatasetApp } from "../dataset_app/base_dataset_app";

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
    popper: {
      width: "50ch",
      maxHeight: 400,
      overflow: "auto",
      zIndex: 10000,
      padding: 20,
      position: "absolute",
      top: 10,
      right: -160,
    },
  })
);

export default function AppAppBar() {
  const classes = useStyles();

  const { selectedApp, anchorEl, searchResults, setResults } =
    React.useContext(DatasetAppContext);

  return (
    <div>
      <Popper
        open={anchorEl !== undefined}
        anchorEl={anchorEl}
        style={{ zIndex: 2000 }}
      >
        <Paper className={classes.popper} variant="outlined">
          <List>
            {searchResults.length > 0 ? (
              searchResults.map((s, i) => selectedApp?.renderSearchItem(s))
            ) : (
              <div>No Results</div>
            )}
          </List>
        </Paper>
      </Popper>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {selectedApp?.getTitle() ?? "Dataset App"}
          </Typography>
          {selectedApp && <SearchBar />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function SearchBar() {
  const classes = useStyles();
  const [text, setText] = React.useState("");

  const { selectedApp, setAnchorEl, anchorEl, searchResults, setResults } =
    React.useContext(DatasetAppContext);

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(undefined)}>
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          inputProps={{ "aria-label": "search" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (text.length === 0) {
                setResults([]);
              } else {
                let result = await selectedApp?.search(text);
                if (result) {
                  setResults(result);
                }
              }
            }
          }}
        />
      </div>
    </ClickAwayListener>
  );
}
