const mongoose = require('mongoose');
const dbName = 'movieclubdb';

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the ${dbName} database!`))
    .catch(err => console.log("Something went wrong when connecting to the database", err));