import express from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  getOneProduct,
  searchProduct,
  updateProduct,
  verifyToken,
} from "../controllers/product-controller.js";

const router = express.Router();

router.get("/",verifyToken, allProducts);
router.post("/add",verifyToken, addProduct);
router.delete("/delete/:id",verifyToken, deleteProduct);
router.get("/product/:id",verifyToken, getOneProduct);
router.put("/update/:id",verifyToken, updateProduct);
router.get("/search/:key",verifyToken, searchProduct);
export default router;
