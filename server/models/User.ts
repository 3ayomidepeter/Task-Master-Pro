import { time } from "console";
import moogoose from "mongoose";

const userSchema = new moogoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = moogoose.model("User", userSchema);
