
import express from "express";
import defRoutes from './routes/index.js';
import ordersRoutes from './routes/v1/orders.js';
import productRoutes from './routes/products.js';
import config from './config/server.config.js';

const app = express();

// parse requests: content-type - application/json
app.use(express.json());
// parse requests: content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next)=>{
   //to allow cross-origin
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
})


app.use(defRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/products', productRoutes);

app.use((error, req, res, next) => {
   const status = error.statusCode;
   const message = error
   res.status(status).json({message: message});
})

app.listen(config.PORT, () => {
   console.log(`Server is running on port ${config.PORT}.`);
 });
 