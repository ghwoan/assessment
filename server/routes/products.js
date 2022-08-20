import express from "express";
 
import { 
   getProductCategories,
} from "../controllers/products.js";

const router = express.Router();


 
// /admin/products => GET
router.get('/categories', getProductCategories);

// /admin/add-product => POST

export default router;
