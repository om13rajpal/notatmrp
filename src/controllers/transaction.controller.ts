import { Request, Response } from "express";
import productModel from "../models/product.model";
import { transactionModel } from "../models/transaction.model";

export async function createTransactionHandler(req: Request, res: Response) {
  const { type, customerId, vendorId, products, businessId } = req.body;

  try {
    const updatedProducts: any[] = [];

    for (const item of products) {
      const product = await productModel.findById(item.productId);
      if (!product) {
        res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
        return;
      }

      const newStock =
        type === "sale"
          ? product.stock - item.quantity
          : product.stock + item.quantity;

      if (newStock < 0) {
        res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`,
        });
        return;
      }

      product.stock = newStock;
      await product.save();

      updatedProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });
    }

    const totalAmount = updatedProducts.reduce((acc, p) => acc + p.price, 0);

    const transaction = await new transactionModel({
      type,
      customerId: type === "sale" ? customerId : null,
      vendorId: type === "purchase" ? vendorId : null,
      products: updatedProducts,
      totalAmount,
      businessId,
    }).save();

    res.status(201).json({
      success: true,
      message: "Transaction created",
      data: transaction,
    });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
}

export async function listTransactionsHandler(req: Request, res: Response) {
  const { type, startDate, endDate } = req.query;
  try {
    const filter: any = {};
    if (type) filter.type = type;
    if (startDate || endDate) filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate as string);
    if (endDate) filter.date.$lte = new Date(endDate as string);

    const transaction = await transactionModel
      .find(filter)
      .populate("products.productId");

    if (!transaction.length) {
      res
        .status(404)
        .json({ success: false, message: "No transactions found" });
      return;
    }

    const totalTransactions = transaction.length;

    const totalSales = transaction.reduce((acc, curr) => {
      return curr.type === "sale"
        ? acc + curr.totalAmount
        : acc - curr.totalAmount;
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        totalTransactions,
        totalSales,
        transactions: transaction,
      },
    });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
}
