// src/routers/productRouter.ts
import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";
import { UserPreferenceModel } from "../models/UserPreference";

export const productRouter = express.Router();

productRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user; // Assuming you have middleware that sets req.user

    if (user) {
      // User is logged in, filter products based on preferences
      const userPreferences = await UserPreferenceModel.findOne({
        email: user.email,
      });

      if (userPreferences) {
        // Sort styles by preference percentage
        const sortedStyles = Object.entries(userPreferences.stylePercentages)
          .sort(([, a], [, b]) => b - a)
          .map(([style]) => style);

        // Filter products based on top styles
        const products = await ProductModel.find({
          style: { $in: sortedStyles },
        });

        // Sort products according to the order of topStyles
        const sortedProducts = products.sort((a, b) => {
          return sortedStyles.indexOf(a.style) - sortedStyles.indexOf(b.style);
        });

        res.json(sortedProducts);
      } else {
        // If no preferences found, return random products
        const products = await ProductModel.aggregate([
          { $sample: { size: 1000 } },
        ]);
        res.json(products);
      }
    } else {
      // User is not logged in, return random products
      const products = await ProductModel.aggregate([
        { $sample: { size: 1000 } },
      ]);
      res.json(products);
    }
  })
);

productRouter.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const newProduct = new ProductModel(req.body);
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  })
);
productRouter.post(
  "/bulk",
  asyncHandler(async (req: Request, res: Response) => {
    const products = req.body;
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ message: "Invalid input: expected an array of products" });
    }

    try {
      const result = await ProductModel.insertMany(products);
      res
        .status(201)
        .json({ message: "Products Created", count: result.length });
    } catch (error) {
      console.error("Error in bulk upload:", error);
      if (error.name === "ValidationError") {
        res
          .status(400)
          .json({ message: "Validation Error", error: error.message });
      } else if (error.code === 11000) {
        res.status(400).json({
          message: "Duplicate key error. Some products may already exist.",
          error: error.message,
        });
      } else {
        res
          .status(500)
          .json({ message: "Error creating products", error: error.message });
      }
    }
  })
);
