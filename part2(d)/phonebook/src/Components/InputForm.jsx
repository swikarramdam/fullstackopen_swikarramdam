import React from "react";

const InputForm = ({ newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <div>
      <input
        placeholder="name"
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        placeholder="number"
        type="number"
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
    </div>
  );
};

export default InputForm;
