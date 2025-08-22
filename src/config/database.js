const mongoose = require("mongoose");


// the best way to connect the Mongoose to nodeJS is to make a async function and then connect by await it. as mongoose.connect return a promise when we execute the function the function will return a promise that we'll be handelled by then and catch.

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://sasukeuchihaps576:PKPA4ozsdt9fOOD4@devtinder2025.ou0pg2n.mongodb.net/DevTinder2025"
  );
};


module.exports = connectDb;
