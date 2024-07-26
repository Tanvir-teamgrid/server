const mongoose = require("mongoose");

// Connection URI
const uri =
  "mongodb+srv://sksarukali:KRet1aKFEBLDDiwU@cluster0.i4aiegf.mongodb.net/mydatabase";

const DB = mongoose.connect(uri);
DB.then(() => {
  console.log("Database successfully connected");
}).catch((err) => {
  console.log(err);
});

module.exports = DB;
