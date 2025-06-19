import React from "react";
import "../../css/form.css";

export default function FormInput({ label, name, value, type, onChange, placeholder }) {
  return (
    <div className="forminput">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
