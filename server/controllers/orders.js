import Order from '../models/order.js';
import OrdersFilterRequest from '../models/ordersFilterRequest.js';

export const getAllSalesOrders = (req, res, next) => {
   const currentPage = req.query.page || 1;
	const perPage = 2;	

   console.log("getAllSalesOrders");
   try {
      Order.fetchAll()
         .then(([rows, fieldData]) => {
            let totalItems = 0;
            if (rows) {
               totalItems = rows.length;
           }
            res.status(200).json({ 
               status:200,
               totalItems: totalItems,
               data: rows
            });
         })
         .catch(err => console.log(err));
   } catch (err) {
      console.log("error here?");
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};


export const getSalesOrders = (req, res, next) => {
   const currentPage = req.query.page || 1;
   const perPage = 10;
   console.log("getSalesOrders");
   console.log("currentPage=" + currentPage);

   if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  // let filter = new OrdersFilterRequest(req.body);
  let filter =req.body;
   try {
      Order.fetchByCondition(filter.startDate, filter.endDate,
         filter.customerFilter, filter.statusFilter,
         filter.categoryFilter, filter.countryFilter)
         .then(([rows, fieldData]) => {
            let totalItems = 0;
            if (rows) {
               totalItems = rows.length;
            }
            
            res.status(200).json({ 
               status:200,
               totalItems: totalItems,
               data: rows
            });
         })
         .catch(err => console.log(err));
   } catch (err) {
      console.log("error here?");
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

export const getCustomerList = (req, res, next) => {
   const currentPage = req.query.page || 1;
   const perPage = 10;
   console.log("getCustomerList");
   console.log(req.query);
   console.log(req.body);
   if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   console.log(req.body);
   
   try {
      Order.fetchCustomerList()
         .then(([rows, fieldData]) => {
            let totalItems = 0;
            if (rows) {
               totalItems = rows.length;
           }
            res.status(200).json({ 
               status:200,
               totalItems: totalItems,
               data: rows
            });
         })
         .catch(err => console.log(err));
   } catch (err) {
      console.log("error here?");
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};


export const getCountryList = (req, res, next) => {
   const currentPage = req.query.page || 1;
   const perPage = 10;
   console.log("getCustomerList");
   console.log(req.query);
   console.log(req.body);
   if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
   console.log(req.body);
   
   try {
      Order.fetchCountryList()
         .then(([rows, fieldData]) => {
            let totalItems = 0;
            if (rows) {
               totalItems = rows.length;
           }
            res.status(200).json({ 
               status:200,
               totalItems: totalItems,
               data: rows
            });
         })
         .catch(err => console.log(err));
   } catch (err) {
      console.log("error here?");
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};