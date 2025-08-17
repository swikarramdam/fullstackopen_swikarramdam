import React from "react";
import InputForm from "./InputForm";
import Notification from "./Notification";
import { useState } from "react";
import personService from "/src/Services/service.js";

const Form = ({
  persons,
  setPersons,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (persons.some((person) => person.name === newName)) {
            showMessage(
              `${newName} is already added to phonebook, do you want to replace the number?`,
              "error"
            );
            const find = persons.find((person) => person.name === newName);
            return personService
              .update({ ...find, number: newNumber }, find.id)
              .then((updatedPerson) => {
                setPersons(
                  persons.map((p) =>
                    p.id === updatedPerson.id ? updatedPerson : p
                  )
                );
                setNewName("");
                setNewNumber("");
                showMessage(`${newName}'s number updated successfully`);
              })
              .catch((error) => {
                showMessage(
                  `${newName}'s has already been removed from the server`,
                  "error"
                );
                setPersons(persons.filter((p) => p.id !== find.id));
              });
          }

          if (persons.some((person) => person.number === newNumber)) {
            showMessage(`${newNumber} is already added to phonebook`, "error");
            return;
          }
          const obj = {
            name: newName,
            number: newNumber,
          };

          personService
            .create(obj)
            .then((data) => setPersons(persons.concat(data)));
          showMessage(`Added ${obj.name} successfully`, "success");
          setNewName("");
          setNewNumber("");
        }}
      >
        <div>
          <Notification message={message} messageType={messageType} />
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
