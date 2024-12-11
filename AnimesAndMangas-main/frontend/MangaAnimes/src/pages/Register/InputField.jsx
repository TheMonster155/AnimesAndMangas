// InputField.js
import React from "react";

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete = "",
  options = [],
}) => {
  if (type === "select") {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-control"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="form-control"
      />
    </div>
  );
};

export default InputField;
