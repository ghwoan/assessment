/**
 * This is a sets of methods to fetch data via API
 */
import { http } from '../utils/http.js';

//get country list from server
export function getCountryList() {
   try {
      return http.get(`/orders/countries`);
   } catch (er) {
      console.log(er);
   }
}

//get customer list
export function getCustomerList() {
   try {
      return http.get(`/orders/customers`);
   } catch (er) {
      console.log(er);
   }
}

//get sales orders
export async function getSalesOrders(filters) {
   let param = {
      ...filters,
      token: ""
   };
   try {
      return http.post(`/orders/filter`, param);
   } catch (er) {
      console.log(er);
   }
}