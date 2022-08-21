import { http } from '../utils/http.js';


export function getCountryList() {
   try {
      return http.get(`/orders/countries`);
   } catch (er) {
      console.log(er);
   }
}


export function getCustomerList() {
   try {
      return http.get(`/orders/customers`);
   } catch (er) {
      console.log(er);
   }
}


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
/*
   http.post(`/orders/filter`, param)
      .then(response => {
         if (response && response.data) {
            return response.data.data;
         } else {
            return [];
         }
      })
      .catch(e => {
         console.log(e);
      return [];   
   })*/
}