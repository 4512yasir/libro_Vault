import React from "react";
import "../../css/search.css";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
