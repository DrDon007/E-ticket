import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  trainNo: { type: String},
  tranPNR: { type: String},
})

const ProfileSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "Person" },
  firstName: { type: String, required: true },
  LastName: { type: String, required: true },
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
  history: [{ type: Schema.Types.ObjectId, ref: 'History' }]
});

const Profile = mongoose.model("Profile", ProfileSchema);
const history = mongoose.model('History', historySchema);

export default Profile;
