mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app').then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
})

Schema = mongoose.Schema({
    name: String,
    mail: String,
    age: Number
})
console.log("schema created");

StudentModel = mongoose.model('student', Schema);

module.exports = StudentModel;