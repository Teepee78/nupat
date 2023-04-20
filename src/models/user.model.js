import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
		required: true
	}
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (2 * 24 * 60 * 60),
    _id: this._id
  }, process.env.NUPAT_JWT);
}


export default mongoose.model("User", userSchema);
