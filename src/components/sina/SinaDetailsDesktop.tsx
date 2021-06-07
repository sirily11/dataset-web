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
import { Post, SinaDatasetDetailProps } from "../dataset_app/SinaDataset";
import DynamicList, { createCache } from "react-window-dynamic-list";
import AutoSizer from "react-virtualized-auto-sizer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: `90vh`,
      overflowY: "hidden",
    },
    cardContent: {
      overflowY: "scroll",
      height: "100%",
    },
  })
);

export default function SinaDetailsDesktop(props: SinaDatasetDetailProps) {
  const { data } = props;
  const classes = useStyles();
  const cache = createCache();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardHeader
        title={data.keyword}
        subheader={`Count: ${data.numbers}      |     Rank: ${data.rank}`}
      />
      <CardContent className={classes.cardContent}>
        <AutoSizer>
          {({ height, width }) => (
            <DynamicList
              height={height}
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
      </CardContent>
    </Card>
  );
}

export function DetailItem(props: { item?: Post; index: number; style: any }) {
  const { item, index, style } = props;

  return (
    <div key={`post-${index}`} style={style}>
      <ListItem button>
        <ListItemAvatar>
          <div>{index + 1}</div>
        </ListItemAvatar>
        <ListItemText
          primary={item?.content
            .replace("收起全文d", "")
            .replace("展开全文c", "……")
            .replace("L", "")
            .replace("", "")}
        />
      </ListItem>
      <Divider />
    </div>
  );
}
