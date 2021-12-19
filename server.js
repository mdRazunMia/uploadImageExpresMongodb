const express = require('express');
// const { MongoClient } = require('mongodb');
require('dotenv').config();
// const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const uploadRoute = require("./routes/uploadImageRoute")

const app = express();

const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
app.use('/uploads', uploadRoute);
// app.get('/',(req, res)=>{
//     res.json({ message:"we are in image upload file"})
// })
app.listen(port, () => {
    console.log('Dot Online Server is running on port', port);
});