const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;

// Mongoose Self involve function
// A "self-involved function" in JavaScript, also known as an Immediately Invoked Function Expression (IIFE), is a function that executes itself immediately after it's defined.
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected Successfully");
})();

// Test-For-Get-Req.Headers => Token
app.get("/", (req, res) => {
  console.log("Token =>", req.header("Authorization").split(" ")[1]);
  res.json("Ok")
})

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});