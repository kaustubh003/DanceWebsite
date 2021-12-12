const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactDance");
const bodyparser = require("body-parser");
const { RSA_NO_PADDING } = require("constants");
const port = 8080;

//Define Mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

const Contact = mongoose.model("Contact", contactSchema);

//EXPRESS Specific Stuff
app.use("/static", express.static("static")); //For serving static files
app.use(express.urlencoded());

//Pug Specific stuff
app.set("view engine", "pug"); //Set template engine as pug
app.set("views", path.join(__dirname, "views")); //Set the views directory

//Endpoints
app.get("/", (req, res) => {
  const con = "Best content on Internet";
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const con = "Best content on Internet";
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("Item has been saved to DataBase")
  }).catch(()=>{
  res.status(400).send("Item was not saved in DataBase")
  })
  // res.status(200).render("contact.pug");
});

//Start server
app.listen(port, () => {
  console.log(`Application started successfully on port ${port}`);
});
