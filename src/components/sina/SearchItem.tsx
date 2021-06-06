import React from "react";
import { Keyword } from "../dataset_app/SinaDataset";
import { useHistory } from "react-router-dom";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import moment from "moment";

interface SearchProps {
  keyword: Keyword;
}

export default function SearchItem(props: SearchProps) {
  const { keyword } = props;
  const history = useHistory();

  return (
    <div>
      <ListItem
        button
        onClick={() => {
          history.push(`/sina/${keyword.id}`);
        }}
      >
        <ListItemText
          primary={keyword.keyword}
          secondary={moment(keyword.time).fromNow()}
        />
      </ListItem>
      <Divider />
    </div>
  );
}
