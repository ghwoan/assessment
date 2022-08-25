import ordersService from "../services/ordersService.js";
//import OrdersFilterRequest from '../models/ordersFilterRequest.js';
import config from "../config/server.config.js";
import Order from "../models/order.js";

//function to validate the Api Key
const validateApiKey = (req, res) => {
   if (req.header("Authorization") == config.API_KEY) {
      return true;
   }
   res.status(401).json({
      error: {
         message: "Unauthorize access!"
      }
   });
   return false;
}

//response the sales order list request with filter
export const getSalesOrders = (req, res, next) => {
   const currentPage = req.query.page || 1;
   const perPage = 10;
   console.log("getSalesOrders", req.header("Authorization"));
   console.log("currentPage=" + currentPage);

   if (!validateApiKey(req, res)) {
      next();
      return;
   }

   if (!req.body) {
      res.status(400).json({
         error: {
            message: "Content can not be empty!"
         }
      });
   }
   // let filter = new OrdersFilterRequest(req.body);
   let filter = req.body;
   try {
      ordersService.getSalesOrders(filter.startDate, filter.endDate,
         filter.customerFilter, filter.statusFilter,
         filter.categoryFilter, filter.countryFilter).then(
            (resp) => {
               if (resp) {
                  res.status(200).json(resp);
               } else {
                  next({ statusCode: 500 });
               }
            }
         );
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
         next(err);
      }
   }
};

//response the customer list request
export const getCustomerList = (req, res, next) => {
   const currentPage = req.query.page || 1;
   const perPage = 10;
   try {
      ordersService.getCustomerList().then(
         (resp) => {
            if (resp) {
               res.status(200).json(resp);
            } else {
               next({ statusCode: 500 });
            }
         }
      );
   } catch (err) {
      console.log(err);
      if (!err.statusCode) {
         err.statusCode = 500;
         next(err);
      }
   }
};

//response the country list request
export const getCountryList = (req, res, next) => {
   try {
      ordersService.getCountryList().then(
         (resp) => {
            if (resp) {
               res.status(200).json(resp);
            } else {
               next({ statusCode: 500 });
            }
         }
      );
   } catch (err) {
      console.log(err);
      if (!err.statusCode) {
         err.statusCode = 500;
         next(err);
      }
   }
}

export const createSalesOrder = (req, res, next) => {
   if (!req.body) {
      res.status(400).json({
         error: {
            message: "Content can not be empty!"
         }
      });
   }
   try {
      ordersService.createOrder(req.body).then(
         (resp) => {
            if (resp) {
               res.status(200).json(resp);
            } else {
               next({ statusCode: 500 });
            }
         }
      );
   } catch (err) {
      console.log(err);
      if (!err.statusCode) {
         err.statusCode = 500;
         next(err);
      }
   }
}

export const deleteSalesOrder = (req, res, next) => {
   if (!req.params.orderId) {
      res.status(400).json({
         error: {
            message: "Content can not be empty!"
         }
      });
      return;
   }
   try {
      ordersService.deleteOrder(req.params.orderId).then(
         (resp) => {
            if (resp) {
               res.status(200).json(resp);
            } else {
               next({ statusCode: 500 });
            }
         }
      );
   } catch (err) {
      console.log(err);
      if (!err.statusCode) {
         err.statusCode = 500;
         next(err);
      }
   }
}

export const getSalesOrder = (req, res, next) => {
   res.status(200).json({"message": "under construction"});
}

export const updateSalesOrder = (req, res, next) => {
   res.status(200).json({"message": "under construction"});
}

