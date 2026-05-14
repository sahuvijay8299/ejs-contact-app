const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/contacts_models");

const app = express();

// const mongoURL = "mongodb://127.0.0.1:27017/contact-app";

mongoose
  .connect("mongodb://127.0.0.1:27017/contact-app")
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log("Error in database connection", error);
  });

app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const allContacts = await Contact.find();
  res.render("home", { contacts: allContacts });
});

app.get("/show-contact", (req, res) => {
  res.render("show-contact");
});

app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

app.post("/add-contact", (req, res) => {
  res.send("Add data Successfully")
});

app.get("/update-contact", (req, res) => {
  res.render("update-contact");
});

app.post("/update-contact", (req, res) => {

  res.send("Updated data Successfully");


});
app.get("/delete-contact", (req, res) => {});

app.listen(1300, () => {
  console.log("Server is running on port http://localhost:1300");
});