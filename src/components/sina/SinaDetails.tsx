import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import { SinaDatasetDetailProps } from "../dataset_app/SinaDataset";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: `90vh`,
      overflowY: "scroll",
    },
    cardContent: {
      overflowY: "scroll",
    },
  })
);

export default function SinaDetails(props: SinaDatasetDetailProps) {
  const { data } = props;
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardHeader
        title={data.keyword}
        subheader={`Count: ${data.numbers}      |     Rank: ${data.rank}`}
      />
      <CardContent className={classes.cardContent}>
        <List>
          {data.posts?.map((p, i) => (
            <div key={`post-${i}`}>
              <ListItem button>
                <ListItemAvatar>
                  <div>{i + 1}</div>
                </ListItemAvatar>
                <ListItemText primary={p.content} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
