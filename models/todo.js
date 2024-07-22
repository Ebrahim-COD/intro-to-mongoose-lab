const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: String,
  age: Number
});

// Compile the schema into a model:
const modelSchema = mongoose.model('modelSchema', todoSchema);

// Export the model:
module.exports = modelSchema;