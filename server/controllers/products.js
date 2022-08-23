import ProductCategory from '../models/productCategory.js';

export const getProductCategories = (req, res, next) => {
   const currentPage = req.query.page || 1;
	const perPage = 2;	
   console.log(req);
   console.log("getProductCategories");
   try {
      ProductCategory.fetchAll()
         .then(([rows, fieldData]) => {
            let totalItems = 0;
            if (rows) {
               totalItems = rows.length;
           }
            res.status(200).json({ 
               status:200,
               totalItems: totalItems,
               data: rows
            });
         })
         .catch(err => console.log(err));
   } catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};