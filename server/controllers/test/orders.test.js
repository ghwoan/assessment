
import { jest } from '@jest/globals';
import ordersService from "../../services/ordersService.js";
import request from "supertest";
import { 
   getCountryList,
   getCustomerList,
   getSalesOrders,
   getSalesOrder
} from "../orders.js";


const mockRequest = () => {
   return {}
 }
 const mockResponse = (mockOrders) => {
   const res = {};
   res.status = jest.fn().mockReturnValue(200);
   res.json = jest.fn().mockReturnValue(mockOrders);
   return res;
}
 
const mockNext = () => jest.fn();

describe('Orders Controller', () => {
   let req;
   let res;
   let token;

   
   // Performs the user's register test
   it('getCountryList', async () => {
      let testData = {
         totalItems: 2,
         data: [{ country: "Malaysia" }, { country: "Indonesia" }]
      };
      ordersService.getCountryList = jest.fn().mockResolvedValue(testData);
     // const res = await request(app).get("/api/v1/orders/countries");
      
      req = mockRequest();
      res = mockResponse(testData);
      const result = await getCountryList(req, res, mockNext());
      expect(res.status()).toBe(200);
      expect(res.json().totalItems).toBe(2);
      expect(res.json().data.length).toBe(2);
   });

})