const mongoose = require("mongoose");


// the best way to connect the Mongoose with nodeJS is to make a async function and then connect by await it. as mongoose.connect return a promise when we execute the function the function will return a promise that we'll be handelled by then and catch.

const connectDb = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_SECRET
  );
};


module.exports = connectDb;
