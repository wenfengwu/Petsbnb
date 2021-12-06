import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;

const HotelSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: 10000,
      },
    location: {
        type: String,
        required: [true, "Location is required"]
      },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
      },
    postedBy:{
        type: ObjectId,
        ref: "User"
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    space: {
        type: Number
      },
    roomFor: {
        type: String,
        required: [true, "RoomFor is required"]
      },
    from: {
        type: Date,
        required: [true, "From Date is required"]
    },
    to: {
        type: Date,
        required: [true, "To Date is required"]
    }
  }, {timestamps: true});
  

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;