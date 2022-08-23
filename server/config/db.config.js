import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
   path: path.resolve(__dirname,`..`, `.env.${process.env.NODE_ENV}`)
});

const dbConfig = {
   HOST: process.env.HOST || "localhost",
   USER: process.env.DB_USER ||"devUser",
   PASSWORD: process.env.DB_PASSWORD || "7est@Loca1",
   DB: process.env.DB_NAME || "vuetest"
};

console.log(dbConfig);
 
export default dbConfig;