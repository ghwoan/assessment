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

const createOrder = (orderData) => {
   try {
      return new Promise((resolve, reject) => {
         const order = new Order(null, orderData.customerName, orderData.status,
            orderData.categoryId, orderData.country, new Date(), null);
         order.save().then((result) => {
            if (result.affectedRows) {
               return resolve({
                  status: 0,
                  orderId: result.insertId
               });   
            } else {
               return resolve({
                  status: -1,
                  error: "Fail to create order"
               });  
            }
            
         }).catch(err => {
            console.log("not able to add");
            return reject(err);
         });
     });     
   } catch (err) {
      throw err;
	}
}


 
const deleteOrder = (id) => {
   try {
      return new Promise((resolve, reject) => {
         if (!id) {
            return {
               status: -1,
               error: {
               message: "Invalid Id!"
            }};
         }

         Order.deleteById(id).then((result) => {
            console.log(result);
            if (result.affectedRows) {
               return resolve({
                  status: 0
               });   
            } else {
               return resolve({error: {
                  message: "Fail to delete order!"
               }});
            }
            
         }).catch(err => {
            console.log("not able to add");
            return reject(err);
         });
     });     
   } catch (err) {
      throw err;
	}
}
 

export default {
   getCountryList,
   getCustomerList,
   getSalesOrders,
   createOrder,
   deleteOrder
 };