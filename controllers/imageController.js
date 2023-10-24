const grid = require("gridfs-stream");
const mongoose = require("mongoose");


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "fs"
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("fs");
});

const handleUpload = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ "msg": "file not found" });
    }
    return res.status(200).json(req.file.filename);
};

const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readstream = gridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);
    }
    catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
};

const updateImage = async (req, res) => {
    try {
        const foundImage = await gfs.files.deleteOne({ filename: req.params.filename });
        if (!foundImage) return res.status(404).json({ "msg": "Image Not Found" });
        res.status(200).json(req.file.filename);
    }
    catch (err) {
        res.status(500).json({ "msg": "Server Error" });
    }
};

module.exports = { handleUpload, getImage, updateImage };