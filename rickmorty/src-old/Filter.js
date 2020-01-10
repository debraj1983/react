import React from "react";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import filterCriteria from "./Constant";

const Filter = props => {
  return (
    <>
      {filterCriteria.map((fC, index) => (
        <List
          key={`List${index}`}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {fC.title}
            </ListSubheader>
          }
        >
          {fC.items.map(item => {
            const labelId = `checkbox-list-label-${item.value}`;

            return (
              <ListItem key={item.value} dense button>
                <Checkbox
                  value={`${item.value}-${fC.queryParam}`}
                  onChange={props.isChecked}
                />
                <ListItemText id={labelId} primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      ))}
    </>
  );
};

export default Filter;
