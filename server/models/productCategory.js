import db  from '../utils/database.js';

export default class ProductCategory {
  constructor(objectId, name, isActive, createdDate, updatedDate) {
    this.objectId = objectId;
    this.name = name;
    this.isActive = isActive;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }

  static save() {
    return db.execute(
      'INSERT INTO product_category (object_id, name, is_active, created_date,updated_date) VALUES (?, ?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM product_category');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE product_category.object_id = ?', [id]);
  }
};
