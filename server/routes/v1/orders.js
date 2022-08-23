import express from "express";
import { 
   getCountryList,
   getCustomerList,
   getSalesOrders
} from "../../controllers/orders.js";

const router = express.Router();

// /orders => GET
router.get('/', getSalesOrders);

// /orders/countries
router.get('/countries', getCountryList);

// /orders/customers
router.get('/customers', getCustomerList);

// /orders/filter => POST
router.post('/filter', getSalesOrders);


export default router;