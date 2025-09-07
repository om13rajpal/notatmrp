import mongoose from "mongoose";

interface IProduct {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  businessId: mongoose.Schema.Types.ObjectId;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxLength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Business",
  },
});

const productModel = mongoose.model<IProduct>("Product", productSchema);

export default productModel;
