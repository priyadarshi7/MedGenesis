import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
		//Personal
		personal: {
			gender: {
			  type: String,
			  enum: ["Male", "Female", "Other"],
			},
			dob: {
			  type: Date,
			},
			contact: {
			  type: Number,
			},
			city: String,
			state: String,
		  },
		  //General Health Info
		  general: {
			bloodgroup: String,
			height: Number, 
			weight: Number, 
			bmi: Number, 
			bloodpressure: String,
			heartrate: String,
			allergies: {
			  type: [String],
			  default: [],
			},
		  },
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);