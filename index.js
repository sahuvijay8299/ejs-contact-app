const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/contacts_models");

const app = express();

// const mongoURL = "mongodb://127.0.0.1:27017/contact-app";

mongoose .connect("mongodb://127.0.0.1:27017/contact-app")
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

app.get("/show-contact/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const contact = await Contact.findById(id);
    res.render("show-contact", { contact });
  } catch (error) {
    console.log("error in show contact", error);
    res.status(404).send("Contact not found");
  }

  // res.render("show-contact")
  // res.json(req.params)
});

app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

app.post("/add-contact", async (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;

  const contact = await Contact.create({
    first_name,
    last_name,
    email,
    phone,
    address,
  });

  // res.json(contact)

  res.redirect("/");
});

app.get("/update-contact/:id", async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);

  // res.json(contact)

  res.render("update-contact", { contact });
});

app.post("/update-contact/:id", async (req, res) => {
  // console.log(req.params.id)

  const id = req.params.id;

  const contact = await Contact.findByIdAndUpdate(id, req.body);

  res.redirect("/");

  // res.send("Update contact successfully")
});

app.get("/delete-contact/:id", async (req, res) => {
  const id = req.params.id;
  await Contact.findByIdAndDelete(id);

  res.redirect("/");

  // res.send("Delete contact successfully")
});

app.listen(1300, () => {
  console.log("Server is running on port http://localhost:1300");
});
