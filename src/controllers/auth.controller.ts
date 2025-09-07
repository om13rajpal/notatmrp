import { Request, Response } from "express";
import { businessModel } from "../models/business.model";
import { comparePassword, hashPassword } from "../utils/password.util";
import { generateToken } from "../utils/token.util";

export async function loginHandler(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const business = await businessModel.findOne({ username });
    if (!business) {
      res.status(400).json({
        success: false,
        message: "Invalid username or password",
        error: "Business not found",
      });
      return;
    }

    const isValidPassword = await comparePassword(password, business.password);
    if (!isValidPassword) {
      res.status(400).json({
        success: false,
        message: "Invalid username or password",
        error: "Incorrect password",
      });
      return;
    }

    const payload = {
      id: business._id,
      name: business.name,
      address: business.address,
      email: business.email,
      username: business.username,
      phone: business.phone,
    };

    const jwt = generateToken(payload);

    business.loginToken = jwt;
    const updatedBusiness = await business.save();

    if (!updatedBusiness) {
      res.status(500).json({
        success: false,
        message: "Login failed",
        error: "Database error",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: jwt,
        business: payload,
      },
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
}

export async function registerHandler(req: Request, res: Response) {
  const { name, address, email, username, phone, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const business = await new businessModel({
      name,
      address,
      email,
      username,
      phone,
      password: hashedPassword,
    }).save();

    if (!business) {
      res.status(400).json({
        success: false,
        message: "Error registering the business",
      });
      return;
    }

    const payload = {
      id: business._id,
      name: business.name,
      address: business.address,
      email: business.email,
      username: business.username,
      phone: business.phone,
    };

    const jwt = generateToken(payload);

    res.status(201).json({
      success: true,
      message: "Business registered successfully",
      data: {
        token: jwt,
        business: payload,
      },
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function logoutHandler(req: Request, res: Response) {
  const { username } = req.body;
  try {
    const business = await businessModel.findOneAndUpdate(
      {
        username,
      },
      {
        loginToken: null,
      }
    );

    if (!business) {
      res.status(400).json({
        success: false,
        message: "Logout failed",
        error: "Business not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
}