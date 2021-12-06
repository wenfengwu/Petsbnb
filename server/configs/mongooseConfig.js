const mongoose = require("mongoose");

//Connect to database
module.exports = (DB) => {
    mongoose.connect(`mongodb://localhost/${DB}`)
        .then( () => console.log(`connected to ${DB} database`))
        .catch( err => console.log(`Something went wrong on connecting to ${DB} db`))
}