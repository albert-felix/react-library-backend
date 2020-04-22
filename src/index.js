require("./config/db")
const express = require("express");

const app = express();

app.get("/",(req,res) => {
  res.send("Backend for library running")
});

const server = app.listen(8080, () => {
  console.log(`Server running in port ${server.address().port}`)
})
