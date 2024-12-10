// src/components/InputPassword.jsx
import React from "react";

const InputPassword = ({
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
      type="password"
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

export default InputPassword;
