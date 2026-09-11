import { Router } from "express";
import { Product } from "../models/product.model.js";

export const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await Product.find();
    console.log(data);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res.status(400).json({
        message: "Please provide required data.",
      });
    }
    const data = await Product.insertOne({ name, price, quantity });
    console.log(data);
    return res.status(200).json({
      message: "Created Product successfully.",
    });
  } catch (error) {
    next(error);
  }
});
