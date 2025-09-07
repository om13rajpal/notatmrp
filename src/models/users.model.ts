import mongoose from "mongoose";

interface ICustomer {
  name: string;
  phone: string;
  email: string;
  address?: string;
  type: "customer" | "vendor";
  businessId: mongoose.Schema.Types.ObjectId;
}

const customerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
    maxLength: 200,
  },
  type: {
    type: String,
    required: true,
    enum: ["customer", "vendor"],
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Business",
  },
});

const customerModel = mongoose.model<ICustomer>("User", customerSchema);

export default customerModel;
