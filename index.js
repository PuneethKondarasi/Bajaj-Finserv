const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const FULL_NAME = "puneeth_kondarasi";
const DOB = "19082004";
const EMAIL = "puneethkondarasi198@gmail.com";
const ROLL_NUMBER = "22BCE3418";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array."
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphaConcat = "";

    data.forEach(item => {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    let concat_string = "";
    let reversed = alphaConcat.split("").reverse().join("");
    for (let i = 0; i < reversed.length; i++) {
      concat_string += i % 2 === 0
        ? reversed[i].toUpperCase()
        : reversed[i].toLowerCase();
    }

    res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
