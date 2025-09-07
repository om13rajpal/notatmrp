import mongoose from "mongoose";


interface IProducts {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}


interface ITransaction {
  type: "sale" | "purchase";
  customerId: mongoose.Schema.Types.ObjectId;
  vendorId: mongoose.Schema.Types.ObjectId;
  products: IProducts[];
  totalAmount: number;
  date: Date;
  businessId: mongoose.Schema.Types.ObjectId;
}

const transactionSchema = new mongoose.Schema<ITransaction>({
  type: {
    type: String,
    required: true,
    enum: ["sale", "purchase"],
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: function (this: ITransaction) {
      return this.type === "sale";
    },
    ref: "User",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: function (this: ITransaction) {
      return this.type === "purchase";
    },
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Business",
  },
});

export const transactionModel = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);