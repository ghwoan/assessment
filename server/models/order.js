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
      sqlFilter = createDateRangeFilter("s.created_date", sqlFilter, startDate, endDate);
      
      sqlFilter = createOpFilter("s.customer_name", sqlFilter, customerFilter);
      sqlFilter = createOpFilter("s.status", sqlFilter, statusFilter);
      sqlFilter = createOpFilter("s.category_id", sqlFilter, categoryFilter, FieldTypeEnum.NUMBER);
      sqlFilter = createOpFilter("s.country", sqlFilter, countryFilter, FieldTypeEnum.STRING);
      
      query = 'SELECT s.*, p.name as category FROM sales_order s ';
      query = query + ' LEFT JOIN product_category p ON s.category_id=p.object_id'
      if (sqlFilter) {
         query = query + " WHERE " + sqlFilter;
      }
     // console.log(query);
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
