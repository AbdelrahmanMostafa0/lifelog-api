import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  googleId?: string;
  provider?: "google" | "email";
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      nullable: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      default: "email",
    },
    passwordResetToken: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.googleId;
    delete ret.provider;
    return ret;
  },
});

export const User = model("User", UserSchema);
