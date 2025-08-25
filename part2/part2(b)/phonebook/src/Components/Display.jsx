import React from "react";

const Display = ({ filtered }) => {
  return (
    <div>
      <ul>
        {filtered.map((person, index) => {
          return (
            <li key={index}>
              {person.name}
              {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Display;
