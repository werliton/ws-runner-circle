import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SelectFieldProps {
  options: { label: string; value: string }[];
  name: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export const SelectField = ({
  options,
  name,
  value,
  handleChange,
}: SelectFieldProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
