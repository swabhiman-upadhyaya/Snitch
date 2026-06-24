import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer"
import { ValidateProductCreation } from "../validator/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

const router = Router();

router.post("/create", authenticateSeller, ValidateProductCreation, upload.array("images", 7), createProduct);

export default router