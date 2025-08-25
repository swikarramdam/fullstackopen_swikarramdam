import React from "react";
import InputForm from "./InputForm";

const Form = ({
  persons,
  setPersons,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
          }
          if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already added to phonebook`);
            return;
          }
          e.preventDefault();

          setPersons(persons.concat({ name: newName, number: newNumber }));
          setNewName("");
          setNewNumber("");
        }}
      >
        <div>
          <InputForm
            newName={newName}
            newNumber={newNumber}
            setNewName={setNewName}
            setNewNumber={setNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
