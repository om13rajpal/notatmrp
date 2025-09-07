import { Request, Response } from "express";
import productModel from "../models/product.model";
import { transactionModel } from "../models/transaction.model";

export async function transactionsReport(req: Request, res: Response) {
  try {
    const { type, startDate, endDate } = req.query as any;
    const filter: any = {};
    if (type) filter.type = type;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(String(startDate));
      if (endDate) filter.date.$lte = new Date(String(endDate));
    }
    const items = await transactionModel.find(filter).sort({ date: -1 });
    res
      .status(200)
      .json({ success: true, message: "Transactions report", data: items });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function inventoryReport(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const items = await productModel.find({ businessId: id }).sort({ name: 1 });
    res
      .status(200)
      .json({ success: true, message: "Inventory report", data: items });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}