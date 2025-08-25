import React from "react";
// import personService from "/src/Services/service.js";
import personService from "/src/Services/service.js";

const Display = ({ filtered, persons, setPersons }) => {
  const handleDelete = (_id) => {
    personService.remover(_id).then(() => {
      // setPersons(persons.filter((person) => person.id !== id));
      personService.getAll().then((data) => setPersons(data));
    });
  };
  return (
    <div>
      <ul>
        {filtered.map((person, index) => {
          return (
            <li key={index}>
              {person.name}
              {person.number}
              <button
                onClick={() => {
                  handleDelete(person._id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Display;
