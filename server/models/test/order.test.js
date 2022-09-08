import db from '../../utils/database.js';
import Order from "../order.js";

describe("SqlUtil Tests", () => {
   beforeAll(async () => {
     //create the table if not exist
    //  await db.query("TRUNCATE TABLE product_category");
   })
   beforeEach(async () => {
     //clear the table data
     await db.query("TRUNCATE Table sales_order");
      // seed with some data
      await db.execute(
         'INSERT INTO sales_order (customer_name, status, category_id, country, created_date) VALUES (?, ?, ?, ?, ?)',
         ['Kivell', 'Accepted', 1, 'United Kingdom', '2022-01-23']
      )
      await db.execute(
         'INSERT INTO sales_order (customer_name, status, category_id, country, created_date) VALUES (?, ?, ?, ?, ?)',
         ['Jardine', 'Accepted', 2, 'Russia', '2022-01-20']
      )
      await db.execute(
         'INSERT INTO sales_order (customer_name, status, category_id, country, created_date) VALUES (?, ?, ?, ?, ?)',
         ['Jardine', 'Processing', 2, 'Russia', '2022-02-09']
      )
      
   
   });
   afterAll(async () => {
      //await db.query("DROP TABLE students");
      await db.query("TRUNCATE Table sales_order");
      db.end();
   })
   
   test("fetchCountryList", async () => {
      var result = await Order.fetchCountryList();
      let rows = result[0];
      // assert
      expect(rows.length).toBe(2);
      expect(rows).toMatchSnapshot();
   });

   test("fetchCustomerList", async () => {
      var result = await Order.fetchCustomerList();
      let rows = result[0];
      // assert
      expect(rows.length).toBe(2);
      expect(rows.map(r=>r.customer_name)).toContain("Jardine");
      expect(rows).toMatchSnapshot();

   });

   
   test("fetchByCondition", async () => {
      let startDate, endDate, customerFilter, statusFilter, categoryFilter, countryFilter;
      var result = await Order.fetchByCondition();
      let rows = result[0];
      // assert
      console.log(rows);
      expect(rows.length).toBe(3);
      expect(rows).toMatchSnapshot();

      
      startDate = "2022-02-01";
      result = await Order.fetchByCondition(startDate);
      rows = result[0];
      expect(rows.length).toBe(1);
      expect(rows[0].customer_name).toMatch("Jardine");
      expect(rows).toMatchSnapshot();

      startDate = undefined;
      endDate = "2022-02-01";
      //endDate, customerFilter, statusFilter, categoryFilter, countryFilter;
      result = await Order.fetchByCondition(startDate, endDate);
      rows = result[0];
      expect(rows.length).toBe(2);
      expect(rows).toMatchSnapshot();


      //test customerFilter
      startDate = undefined;
      endDate = "2022-02-01";
      customerFilter = { list: ["Jardine"], op: "IN" };
      result = await Order.fetchByCondition(startDate, endDate, customerFilter);
      rows = result[0];
      expect(rows.length).toBe(1);
      expect(rows).toMatchSnapshot();

      
      startDate = undefined;
      endDate = undefined;
      customerFilter = { list: ["Jardine"], op: "OUT" };
      result = await Order.fetchByCondition(startDate, endDate, customerFilter);
      rows = result[0];
      expect(rows.length).toBe(1);
      expect(rows[0].customer_name).toMatch("Kivell");
      expect(rows).toMatchSnapshot();
   });

});