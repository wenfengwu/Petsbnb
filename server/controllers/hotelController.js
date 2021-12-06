import Hotel from "../models/hotels";
import fs from "fs";

export const create = async (req, res) => {
    try{
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);

        hotel.postedBy = req.user._id;

        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path);
            // console.log(files.image.path);
            hotel.image.contentType = files.image.type;
        }
        hotel.save((err, result) => {
            if(err){
                console.log("something wrong on saving hotel", err)
                res.status(400).send('Please fill out the form!!!');
            }
            res.json(result);
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
};

export const viewAll = async (req, res) => {
    let hotels = await Hotel.find({}).limit(24).select("-image.data").populate("postedBy", "_id firstName lastName").exec();
    res.json(hotels);
}

export const image = async (req, res) => {
    try{
        let hotel = await Hotel.findById(req.params.hotelId).exec();
        if(hotel && hotel.image && hotel.image.data !== null){
            res.set('Content-Type', hotel.image.contentType)
            return res.send(hotel.image.data);
        }
    }
    catch(err){
        console.log(err);
    }
}

export const hostHotels = async (req, res) =>{
    try{
        let hotels = await Hotel.find({postedBy: req.user._id}).select('-image.data').populate('postedBy', '_id firstName lastName').exec();
        console.log(hotels);
        res.send(hotels);
    }
    catch(err){
        console.log(err);
    }
}

export const remove = async (req, res) => {
    try{
        let removed = await Hotel.findByIdAndDelete(req.params.hotelId).select("-image.data").exec();
        res.json(removed);
    }
    catch(err){
        console.log(err);
    }
}

export const read = async (req, res) => {
    try{
        let hotel = await Hotel.findById(req.params.hotelId).select('-image.data').populate('postedBy', '_id firstName lastName').exec();
        console.log(hotel);
        res.json(hotel);
    }
    catch(err){
        console.log(err);
    }
}