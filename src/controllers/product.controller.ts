import { Request, Response } from "express";
import productModel from "../models/product.model";

export async function createProductHandler(req: Request, res: Response) {
  const { name, description, price, stock, category, businessId } = req.body;

  try {
    const product = await new productModel({
      name,
      description,
      price,
      stock,
      category,
      businessId,
    }).save();
    res
      .status(201)
      .json({ success: true, message: "Product created", data: product });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const update = req.body;
    const product = await productModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product updated", data: product });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function listProductsHandler(req: Request, res: Response) {
  const { businessId, category, name } = req.query;
  try {
    const filter: any = {};
    if (businessId) filter.businessId = businessId;
    if (category) filter.category = category;
    if (name) filter.name = { $regex: name, $options: "i" };

    const products = await productModel.find(filter);

    res
      .status(200)
      .json({ success: true, message: "Products retrieved", data: products });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function adjustStockHandler(req: Request, res: Response) {
  const { id, quantity } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(id, {
      $inc: { stock: parseInt(quantity) },
    });
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Stock adjusted", data: product });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
