const express = require("express")
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const multer = require("multer")



const upload = multer()
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const uploadImageInfo = multer({storage: storage}).single('image')

//Database

//database uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rv6z4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
console.log('connected to the database');
const database = client.db("dotOnline");
const uploadImageCollection = database.collection("upload_image");

const uploadImage = async (req, res, next)=>{
    console.log(req.file.originalname)
    console.log(req.file.path)
    // res.json({message: "we are in upload image controller"})
    const imageInfo = {
        "name": req.file.originalname,
        "path": req.file.path
    }
    const uploadImageResponse= await uploadImageCollection.insertOne(imageInfo)
    res.json(uploadImageResponse)
    
}

const getUploadImage = (req, res)=>{
    const allImages = uploadImageCollection.find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
}

module.exports = {
    uploadImage,
    uploadImageInfo,
    getUploadImage
}