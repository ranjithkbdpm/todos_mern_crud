import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "todos"
//let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let client = new MongoClient(uri);

export const openDBConnection = async() => {
    try{
        await client.connect();
        console.log('Database connected successfully');
        return client.db(dbName);
    }
    catch(err){
        console.log('Error connecting to database: ',err);
        console.log(err.stack);
    }    
}

export const closeDBConnection = async() => {
    try {
        await client.close();
        console.log('Database connection closed successfully');
    }
    catch(err){
        console.log('Error closing connecting to database: ',err);
        console.log(err.stack);
    }
}


// export {openDBConnection, closeDBConnection};


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });