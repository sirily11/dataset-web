import React from "react";
import { Keyword, SinaDatasetListProps } from "../dataset_app/SinaDataset";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  createStyles,
  Fade,
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import moment from "moment";
import qs from "qs";
import { DatasetAppContext } from "../home/SelectedAppContext";
import SinaDetails from "./SinaDetails";

interface RowProps {
  keyword?: Keyword;
  style: any;
  selectedIndex?: string;
  loadMore(): Promise<void>;
  selectKeyword(keyword: Keyword): Promise<void>;
  index: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    card: {
      height: `90vh`,
    },
  })
);

export default function SinaList(props: SinaDatasetListProps) {
  const { fetchList, fetchNext, hasNext, fetchDetail, appContext } = props;

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const params = useParams<{ id?: string }>();

  const { setIsLoading } = React.useContext(DatasetAppContext);
  const {
    setItems,
    items: keywords,
    setSelectedIndex,
    selectedIndex,
    detail,
    setSelectedDetail,
  } = React.useContext(appContext);

  React.useEffect(() => {
    setIsLoading(true);
    fetchList()
      .then((v) => {
        if (v) {
          setItems(v);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setSelectedIndex(params.id ? params.id : undefined);
    if (params.id) {
      setIsLoading(true);
      fetchDetail(params.id)
        .then((d) => {
          setSelectedDetail(d);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [location]);

  const loadMore = React.useCallback(async () => {
    setIsLoading(true);
    let n = await fetchNext();
    setIsLoading(false);
    if (n) {
      let newKeywords = keywords.concat(n);
      setItems(newKeywords);
    }
  }, [keywords]);

  const selectKeyword = React.useCallback(
    async (keyword: Keyword) => {
      history.push({
        pathname: "/sina/" + keyword.id,
      });
    },
    [keywords]
  );

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item xs={4}>
        <Card className={classes.card} variant="outlined">
          {/* <CardHeader title="Keywords" /> */}
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={hasNext() ? keywords?.length + 1 : keywords?.length}
                width={width}
                itemSize={70}
              >
                {({ index, style }) => (
                  <ItemRow
                    selectedIndex={selectedIndex}
                    selectKeyword={selectKeyword}
                    keyword={
                      index < keywords.length ? keywords[index] : undefined
                    }
                    style={style}
                    loadMore={loadMore}
                    index={index}
                  />
                )}
              </List>
            )}
          </AutoSizer>
        </Card>
      </Grid>
      <Fade in={detail !== undefined} mountOnEnter unmountOnExit>
        <Grid item xs={8}>
          <SinaDetails data={detail!} />
        </Grid>
      </Fade>
    </Grid>
  );
}

function ItemRow(props: RowProps) {
  const { keyword, style, loadMore, selectKeyword, selectedIndex, index } =
    props;

  return keyword !== undefined ? (
    <ListItem
      style={style}
      button
      selected={keyword.id.toString() === selectedIndex}
      onClick={() => selectKeyword(keyword)}
    >
      <ListItemText
        primary={`${keyword.keyword}`}
        secondary={moment(keyword.time).fromNow()}
      />
    </ListItem>
  ) : (
    <ListItem style={style} button onClick={loadMore}>
      <ListItemText primary={`Load More`} />
    </ListItem>
  );
}
