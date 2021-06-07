import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import {
  Keyword,
  SinaDatasetMobileDetailProps,
} from "../dataset_app/SinaDataset";
import DynamicList, { createCache } from "react-window-dynamic-list";
import AutoSizer from "react-virtualized-auto-sizer";
import { DetailItem } from "./SinaDetailsDesktop";
import { DatasetAppContext } from "../home/SelectedAppContext";
import { useLocation, useParams } from "react-router";
import Skeleton from "@material-ui/lab/Skeleton";
//@ts-ignore
import MetaTags from "react-meta-tags";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "95vh",

      overflowY: "hidden",
    },
    cardContent: {
      overflowY: "scroll",
      height: "100%",
    },
  })
);

export default function SinaDetailsMobile(props: SinaDatasetMobileDetailProps) {
  const classes = useStyles();
  const cache = createCache();
  const location = useLocation();
  const params = useParams<{ id?: string }>();
  const [data, setData] = React.useState<Keyword>();
  const { setIsLoading } = React.useContext(DatasetAppContext);

  React.useEffect(() => {
    if (params.id) {
      let id = params.id;
      setIsLoading(true);
      props
        .fetchDetail(id)
        .then((v) => {
          setData(v);
        })
        .finally(() => setIsLoading(false));
    }
  }, [params]);

  return data !== undefined ? (
    <div className={classes.card}>
      <MetaTags>
        <title>{data.keyword}</title>
      </MetaTags>
      <CardHeader
        title={data.keyword}
        subheader={`Count: ${data.numbers}      |     Rank: ${data.rank}`}
      />
      <div className={classes.cardContent}>
        <AutoSizer>
          {({ height, width }) => (
            <DynamicList
              height={height - 75}
              width={width}
              cache={cache}
              data={data.posts ?? []}
            >
              {({ index, style }) => (
                <DetailItem
                  index={index}
                  style={style}
                  item={data.posts ? data.posts[index] : undefined}
                />
              )}
            </DynamicList>
          )}
        </AutoSizer>
      </div>
    </div>
  ) : (
    <div style={{ overflowY: "hidden" }}>
      {Array.from(new Array(22)).map(() => (
        <div>
          <Skeleton height={40} />
        </div>
      ))}
    </div>
  );
}
