import Order from '../models/order.js';

//to get the country list data
const getCountryList = async () => {
   try {
      return new Promise((resolve, reject) => {
         Order.fetchCountryList().then(([rows, fieldData]) => {
            let totalItems = 0;
            let list = [];
            if (rows) {
               totalItems = rows.length;
               list = rows;
            }
            return resolve({
               totalItems: totalItems,
               data: list
            });
         })
         .catch(err => { return reject(err) });
     });       
   } catch (err) {
      throw err;
	}
};
 
//get the customer list data
//return as {totalItems: number , data: []}
const getCustomerList = () => {
   try {
      return new Promise((resolve, reject) => {
         Order.fetchCustomerList().then(([rows, fieldData]) => {
            let totalItems = 0;
            let list = [];
            if (rows) {
               totalItems = rows.length;
               //provide the relevant info to UI
               list = rows.map(r => {
                  return { customerName: r.customer_name };
               })
            }
            return resolve({
               totalItems: totalItems,
               data: list
            });
         })
         .catch(err => { return reject(err) });
     });     
   } catch (err) {
      throw err;
	}
};
 
//get the sales orders based on the provided filters
const getSalesOrders = (startDate, endDate,
   customerFilter, statusFilter,
   categoryFilter, countryFilter) => {
   try {
      return new Promise((resolve, reject) => {
         Order.fetchByCondition(startDate, endDate, customerFilter,
            statusFilter, categoryFilter, countryFilter)
            .then(([rows, fieldData]) => {
               let totalItems = 0;
               let list = [];
               if (rows) {
                  totalItems = rows.length;
                  //list = rows;
                  //provide the relevant info to UI
                  list = rows.map(r => {
                     return {
                        orderId: r.object_id,
                        customerName: r.customer_name,
                        status: r.status,
                        category: r.category,
                        country: r.country,
                        createdDate: r.created_date

                     };
                  })
               }
               return resolve({
                  totalItems: totalItems,
                  data: list
               });
            })
            .catch(err => { return reject(err) });
     });      
   } catch (err) {
      throw err;
	}
};

export default {
   getCountryList,
   getCustomerList,
   getSalesOrders
 };