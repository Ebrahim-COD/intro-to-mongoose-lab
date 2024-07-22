require("dotenv").config(); // database connection env
const mongoose = require("mongoose"); //Library of mongoDB modelling
const prompt = require("prompt-sync")(); //Library for user input

const modelSchema = require("./models/todo.js"); //my model schema in the todo.js

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI); //Connecting mongodb using the URL
  console.log("Connected to MongoDB");
  await runQueries();
};

const runQueries = async () => {
  while (true) {
    //Infinite Loop until you press exit
    console.log("Welcome to the CRM");
    console.log("1. Create a customer");
    console.log("2. View all customers");
    console.log("3. Update a customer");
    console.log("4. Delete a customer");
    console.log("5. Quit");

    const choice = prompt("What would you like to do? "); //The user has to choose 1-5 options

    switch (choice) {
      case "1":
        await create();
        break;
      case "2":
        await view();
        break;
      case "3":
        await update();
        break;
      case "4":
        await Delete();
        break;
      case "5":
        await quit();
        return; // Exits the loop with return
      default:
        console.log("Error, Please choose one of the following above options!");
        break;
    }
  }
};

let create = async () => {
  const name = prompt("Enter the customer Name: "); // Creating a customer name
  const age = Number(prompt("Enter the age of the customer: ")); //Creating customer age

  const customer = {
    //customer object
    text: name,
    age: age,
  };
  try {
    const newCustomer = await modelSchema.create(customer); //Creating a new customer in the database and we wait for  the result in newcustomer
    console.log(`A new customer is added`, newCustomer);
  } catch (error) {
    console.log("Error creating a customer try again!");
  }
};

let view = async () => {
  const viewCustomer = await modelSchema.find({}); //Finds and displays all the customers
  console.log("All the Customers: ", viewCustomer);
};

let update = async () => {
  try {
    const viewCustomer = await modelSchema.find({}); // Displays all the customers to help identify which customer need to be updated by its id.
    console.log("All the Customers: ", viewCustomer);

    const id = prompt(
      "Copy and paste the ID of the customer you would like to update here: " //prompt id for the customer need to update
    );
    const newName = prompt("Enter the new name for the customer: "); //prompt new customer name
    const newAge = Number(prompt("Enter the new age for the customer: ")); //prompt new customer age

    const updatingCustomer = {
      //updated values in the object
      text: newName,
      age: newAge,
    };

    const updateCustomer = await modelSchema.findByIdAndUpdate(
      //Updates the customer and returns
      id, //ID of the document
      updatingCustomer, //Object with updated values
      { new: true } //method to return the updated document
    );

    if (updateCustomer) {
      console.log("Cutomer updated succesfully: ", updateCustomer);
    }
  } catch {
    console.log("Error! No ID Provided");
  }
};

let Delete = async () => {
  try {
    const viewCustomer = await modelSchema.find({}); // Displays all the customers to help identify which one to delete
    console.log("All the Customers: ", viewCustomer);

    const id = prompt("Enter the ID of the customer you want to delete: "); //prompt for the id to delete the customer

    const deleteCustomer = await modelSchema.findByIdAndDelete(id); //Deletes the customer and waits for the result

    if (deleteCustomer) {
      console.log("Succesfully deleted the customer: ", deleteCustomer);
    }
  } catch (error) {
    console.log("Please enter the valid ID for the customer!");
  }
};

let quit = async () => {
  console.log("Exiting the application...");
  await mongoose.disconnect(); //Waits for the disconnection process so that it ensures that the database connection is properly closed.
  process.exit();
};

connect();
