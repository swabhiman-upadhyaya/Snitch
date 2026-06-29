import { Router } from "express";
import { createProduct, getAllProducts, getProductDetails, getSellerProducts } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer"
import { ValidateProductCreation } from "../validator/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

const router = Router();

/**
 * @route POST /api/products/create
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post("/create", authenticateSeller, upload.array("images", 7), ValidateProductCreation, createProduct);

/**
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts)

/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get("/all", getAllProducts)

/**
 * @route GET /api/product/detail/:id
 * @description Get product details by ID
 * @access Public
 */
router.get("/detail/:id", getProductDetails)



export default router