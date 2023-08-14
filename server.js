require('dotenv').config({ path: './config/.env' })

const mongoose = require('mongoose');


//DB Connection
exports.dbConnect = mongoose.connect("mongodb+srv://Sanjay:Sanjay123@cluster0.yji7hdg.mongodb.net/?retryWrites=true&w=majority", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('db connected');
}).catch((err) => {
    console.log(err);
});
