import { Request, Response } from "express";
import customerModel from "../models/users.model";

export async function createUserHandler(req: Request, res: Response) {
  const { name, phone, email, address, type, businessId } = req.body;
  try {
    const user = await new customerModel({
      name,
      phone,
      email,
      address,
      type,
      businessId,
    }).save();

    if (!user) {
      res.status(400).json({ success: false, message: "User not created" });
      return;
    }

    res
      .status(201)
      .json({ success: true, message: "User created", data: user });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const update = req.body;

    const user = await customerModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "User updated", data: user });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deleted = await customerModel.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function listUsersHandler(req: Request, res: Response) {
  const { name, phone, email, type } = req.query;
  try {
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (phone) filter.phone = { $regex: phone, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (type) filter.type = type;

    const users = await customerModel.find(filter);
    res.status(200).json({
      success: true,
      message: "Users retrieved",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await customerModel.findById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, message: "User", data: user });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
