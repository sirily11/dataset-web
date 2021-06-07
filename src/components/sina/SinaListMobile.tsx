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
import { ListItemRow } from "./SinaListDesktop";
import { DatasetAppContext } from "../home/SelectedAppContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: `95vh`,
    },
  })
);

export default function SinaListMobile(props: SinaDatasetListProps) {
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
    } else {
      setSelectedDetail(undefined);
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
    <div className={classes.container}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={hasNext() ? keywords?.length + 1 : keywords?.length}
            width={width}
            itemSize={70}
          >
            {({ index, style }) => (
              <ListItemRow
                selectedIndex={selectedIndex}
                selectKeyword={selectKeyword}
                keyword={index < keywords.length ? keywords[index] : undefined}
                style={style}
                loadMore={loadMore}
                index={index}
              />
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}
