import mongoose from "mongoose";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

export const allProducts = async (req, res) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    console.log(error);
  }
  if (!products) {
    return res.status(400).json({ message: "No Product Found" });
  }
  return res.status(200).json(products);
};

export const addProduct = async (req, res) => {
  const { productName, brand, price, category, userId } = req.body;
  let existingProduct;
  try {
    existingProduct = await Product.findOne({ productName });
  } catch (error) {
    console.log(error);
  }
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exist" });
  }
  const product = new Product({
    productName,
    brand,
    price,
    category,
    userId,
  });

  try {
    await product.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ product });
};

export const deleteProduct = async (req, res) => {
  const productid = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndDelete(productid);
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
};

export const getOneProduct = async (req, res) => {
  let product;
  try {
    product = await Product.findById({ _id: req.params.id });
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const { productName, price, brand, category } = req.body;
  const productid = req.params.id;

  let product;
  try {
    product = await Product.findByIdAndUpdate(productid, {
      productName,
      price,
      brand,
      category,
    });
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
};

export const searchProduct = async (req, res) => {
  let product;

  product = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        brand: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  res.send(product);
};

export function verifyToken(req, res, next) {
  console.log(req.headers['authorization']);
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "secret123", (err, valid) => {
      if (err) {
        res.status(401).send({ message: "Please provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ message: "Please provide a token" });
  }
}
