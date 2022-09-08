import ordersService from "../ordersService";
import Order from '../../models/order.js';
import { jest } from '@jest/globals';


//mock database country list 
Order.fetchCountryList = jest.fn().mockResolvedValueOnce([
   [{ country: "Malaysia" }, { country: "Indonesia" }]
   , {}]).mockRejectedValueOnce("error");
 
   
describe("ordersService Tests", () => {
   beforeAll(async () => {

   })

   it('getCountryList', async () => {
      const ret = await ordersService.getCountryList();
      expect(ret.totalItems).toEqual(2);
      expect(ret.data.length).toEqual(2);
      expect(ret.data[0].country).toMatch("Malaysia");
    });


   it('getCountryList failure', async () => {
     await expect(ordersService.getCountryList()).rejects.toEqual("error");
    });

   
});