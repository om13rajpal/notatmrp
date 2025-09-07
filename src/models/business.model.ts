import mongoose from "mongoose";

interface IBusiness {
  name: string;
  address?: string;
  email: string;
  username: string;
  phone?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  loginToken?: string;
}

const businessSchema = new mongoose.Schema<IBusiness>({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  loginToken: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const businessModel = mongoose.model<IBusiness>(
  "Business",
  businessSchema
);
