import express from "express";
import { 
   getCountryList,
   getCustomerList,
   getSalesOrders,
   createSalesOrder,
   updateSalesOrder,
   deleteSalesOrder,
   getSalesOrder
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

// Create a new order
router.post('/', createSalesOrder);
// retrieve single order
router.get('/:orderId', getSalesOrder);
//Update an order
router.put('/:orderId', updateSalesOrder);
//delete an order
router.delete('/:orderId', deleteSalesOrder);

export default router;