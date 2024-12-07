require("dotenv").config();

const configurations={
    ConnectionString:{
        MongoDb: process.env.CONNECTION_STRING_MONGODB
    }
}

module.exports=configurations;