import React from "react";

const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <select
      className="form-select"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
