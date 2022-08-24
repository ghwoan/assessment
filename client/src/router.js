import { createRouter, createWebHistory } from 'vue-router';
import SalesOrderList from './pages/SalesOrders/SalesOrdersList.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
   history: createWebHistory(),
   routes: [
     { path: '/', redirect: '/orders' },
     { path: '/sales-orders', component: SalesOrderList },
     { path: '/orders', component: SalesOrderList },
     { path: '/:notFound(.*)', component: NotFound }
   ]
 });
 
 export default router;