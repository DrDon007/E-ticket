import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  email: { type: "string", required: true },
  passwordHash: { type: "string", required: true },
});
UserSchema.static("findById", function (id) {
  return this.find({ id });
});

const User = mongoose.model("User", UserSchema);

export default User;
