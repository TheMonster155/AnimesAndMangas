// src/components/Message.jsx
import React from "react";

const Message = ({ type, text }) => (
  <div
    className={`alert ${type === "success" ? "alert-success" : "alert-danger"}`}
    role="alert"
  >
    {text}
  </div>
);

export default Message;
