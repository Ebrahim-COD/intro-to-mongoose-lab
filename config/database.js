const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

//To check if the database is connected successfully
const db = mongoose.connection;
db.on('connected', ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})