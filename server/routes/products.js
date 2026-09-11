import { Router } from "express";
import { Product } from "../models/product.model.js";

export const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { sort, filter } = req.query;
    if (sort && filter) {
      const data = await Product.find({
        name: { $regex: `(?i)${filter}` },
      }).sort({ price: sort === "low" ? 1 : -1 });
      return res.status(200).json({
        success: true,
        data,
      });
    } else if (sort) {
      const data = await Product.find().sort({ price: sort === "low" ? 1 : -1 });
      return res.status(200).json({
        success: true,
        data,
      });
    } else if (filter) {
      const data = await Product.find({ name: { $regex: `(?i)${filter}` } });
      return res.status(200).json({
        success: true,
        data,
      });
    }
    const data = await Product.find();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Cannot found this product.",
      });
    }
    console.log(data);
    return res.json({
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

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const data = await Product.findByIdAndUpdate(id, { name, price, quantity });
    if (!data) {
      return res.status(400).json({
        message: "Cannot find this product.",
      });
    }
    console.log(data);
    return res.status(200).json({
      success: true,
      message: "Updated product successfully.",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await Product.findByIdAndDelete(id);
    console.log(response);
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Cannot find this prodcut.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted this prodcut successfully.",
    });
  } catch (error) {
    next(error);
  }
});
