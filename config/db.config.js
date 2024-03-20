
import mongoose  from "mongoose";
const dev = require("./dev.config.json");
/*
 * Created on Feb 8 2023
 * @author Test
 * connect mongodb data base 
 */ 
exports.connectMyDb = () => {
    // mongoose.set('strictQuery', true);
    mongoose.connect(
      dev.DB_CONNECT,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log("connected to db")
    );

}