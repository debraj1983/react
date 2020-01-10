import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import filterCriteria from "../../Constant";

const Filter = props => {
  return (
    <>
      {filterCriteria.map((fC, index) => (
        <FormControl component="fieldset" key={`List${index}`}>
          <FormLabel component="legend">{fC.title}</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            onChange={props.isChecked}
          >
            {fC.items.map(item => {
              const labelId = `checkbox-list-label-${item.value}`;
              return (
                <FormControlLabel
                  key={item.value}
                  value={`${item.value}-${fC.queryParam}`}
                  control={<Radio />}
                  label={item.text}
                  id={labelId}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      ))}
    </>
  );
};
export default Filter;
