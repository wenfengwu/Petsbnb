import expressJwt from 'express-jwt'
import Hotel from '../models/hotels';

export const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    // algo to decode the secret
    algorithms: ["HS256"],
});

export const hotelOwner = async (req, res, next) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    let owner = hotel.postedBy._id.toString() === req.user._id.toString();
    if(!owner){
        return res.status(403).send("Unauthorized");
    }
    next();
}