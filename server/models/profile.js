import {Schema, model} from "mongoose";
import {bookingsSchema} from './booking';

const ProfileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  PlaceOfBirth: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  currentPlace: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  relationshipStatus: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
  coverPhoto: {
    type: String,
    required: false,
  },
  bookings : [{
    type : Schema.Types.ObjectId,
    ref : 'Booking'
  }]
});

const Profile = model("Profile", ProfileSchema);


export default Profile;
