import React from "react";

const InputText = ({
  label,
  id,
  name,
  value,
  onChange,
  required,
  autoComplete,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type="text"
      className="form-control"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
    />
  </div>
);

export default InputText;
