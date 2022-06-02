import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

const SelectDropDown = props => {
  const { mode } = props;

  const [value, setValue] = useState(mode);

  const handleChange = (event, updateData) => updateData(event.target.value);

  useEffect(() => {
    setValue(mode[0]);
  }, []);

  return (
    <Select value={value} onChange={e => handleChange(e, setValue)}>
      {mode.map(data => (
        <MenuItem key={`${data}-uploadType`} value={data}>
          {data}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectDropDown;
