const InputDate = ({ label, id, name, value, onChange, required }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type="date"
      className="form-control"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);
export default InputDate;
