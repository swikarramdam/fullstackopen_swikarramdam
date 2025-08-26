import React from "react";

const Filter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <span>filter with search</span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
