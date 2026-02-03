import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  name: string;
  role: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name:{type:String,required:true},
    role: { type: String, required: true, default: "user" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", userSchema);
