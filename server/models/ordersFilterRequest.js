
 
//The /orders/filter 
//{ status: {} }
export default class OrdersFilterRequest {
   constructor(orderReq) {
      if (orderReq) {
         this.startDate = orderReq.startDate;
         this.endDate = orderReq.endDate;
         this.customerFilter = orderReq.customerFilter ;
         this.statusFilter = orderReq.statusFilter;
         this.categoryFilter = orderReq.categoryFilter;
         this.countryFilter = orderReq.countryFilter;
         
      }
      }
/*
   constructor(startDate, endDate, customerFilter,
      statusFilter, categoryFilter, countryFilter) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.customerFilter = customerFilter ;
      this.statusFilter = statusFilter;
      this.categoryFilter = categoryFilter;
      this.countryFilter = countryFilter;
   }*/

}
