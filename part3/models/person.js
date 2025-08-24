const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    required: [true, "Number is required"],

    validate: {
      validator: function (v) {
        // must be at least 8 characters
        if (v.length < 8) return false;

        // must have exactly one dash
        const parts = v.split("-");
        if (parts.length !== 2) return false;

        const [part1, part2] = parts;

        // first part = 2 or 3 digits
        if (!/^\d{2,3}$/.test(part1)) return false;

        // second part = only digits
        if (!/^\d+$/.test(part2)) return false;

        return true; // valid number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

module.exports = mongoose.model("Person", personSchema);
