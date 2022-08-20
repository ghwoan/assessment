import db from '../utils/database.js';
import { createDateRangeFilter,createOpFilter, FieldTypeEnum } from '../utils/sqlUtil.js';

export default class Order {
   constructor(objectId, customerName, status, categoryId, country, createdDate, updatedDate) {
      this.objectId = objectId;
      this.customerName = customerName;
      this.status = status;
      this.categoryId = categoryId;
      this.country = country;
      this.createdDate = createdDate;
      this.updatedDate = updatedDate;
   }

   save() {
      return db.execute(
        'INSERT INTO sales_order (customer_name, status, category_id, country, created_date,updated_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [this.customerName, this.status, this.categoryId, this.country, this.createdDate, this.updatedDate]
      );
   }
   
   static fetchAll() {
      return db.execute('SELECT * FROM sales_order');
      
   }
  
   static fetchByCondition(startDate, endDate, customerFilter,
      statusFilter, categoryFilter, countryFilter) {
      let sqlFilter = "";
      let query = "";
      sqlFilter = createDateRangeFilter("created_date", sqlFilter, startDate, endDate);
      sqlFilter = createOpFilter("customer_name", sqlFilter, customerFilter);
      sqlFilter = createOpFilter("status", sqlFilter, statusFilter);
      sqlFilter = createOpFilter("category_id", sqlFilter, categoryFilter, FieldTypeEnum.NUMBER);
      sqlFilter = createOpFilter("country", sqlFilter, countryFilter, FieldTypeEnum.STRING);
      
      query = 'SELECT * FROM sales_order';
      if (sqlFilter) {
         query = query + " WHERE " + sqlFilter;
      }
      console.log(query);
     return db.execute(query);
   }

   static fetchCustomerList() {
      return db.execute('SELECT DISTINCT customer_name FROM sales_order');
   }
   
   static fetchCountryList() {
      return db.execute('SELECT DISTINCT country FROM sales_order');
   }

  static deleteById(id) {}


  static findById(id) {
    return db.execute('SELECT * FROM sales_order WHERE sales_order.object_id = ?', [id]);
  }
};
