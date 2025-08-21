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

          // Check if number already exists
          if (persons.some((person) => person.number === newNumber)) {
            showMessage(`${newNumber} is already added to phonebook`, "error");
            return;
          }

          const existingPerson = persons.find(
            (person) => person.name === newName
          );

          if (existingPerson) {
            // Update existing person's number
            personService
              .update(
                { ...existingPerson, number: newNumber },
                existingPerson._id
              )
              .then((updatedPerson) => {
                setPersons(
                  persons.map((p) =>
                    p.id === updatedPerson._id ? updatedPerson : p
                  )
                );
                showMessage(
                  `${newName}'s number updated successfully`,
                  "success"
                );
                setNewName("");
                setNewNumber("");
              })
              .catch((error) => {
                const errMsg = error.response?.data?.error || "Update failed";
                showMessage(`${newName}'s update failed: ${errMsg}`, "error");
                if (
                  errMsg.includes("removed") ||
                  errMsg.includes("CastError")
                ) {
                  setPersons(
                    persons.filter((p) => p._id !== existingPerson._id)
                  );
                }
              });

            return; // stop further execution
          }

          // Add new person
          const newPerson = { name: newName, number: newNumber };
          personService
            .create(newPerson)
            .then((data) => {
              setPersons(persons.concat(data));
              showMessage(`Added ${data.name} successfully`, "success");
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              const errMsg = error.response?.data?.error || "Adding failed";
              showMessage(errMsg, "error");
            });
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
