import { createRouter, createWebHistory } from 'vue-router';
import SalesOrderList from './pages/SalesOrders/SalesOrdersList.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
   history: createWebHistory(),
   routes: [
     { path: '/', redirect: '/orders' },
    /* {
       path: '/coaches/:id',
       component: CoachDetail,
       props: true,
       children: [
         { path: 'contact', component: ContactCoach } // /coaches/c1/contact
       ]
     },*/
     { path: '/orders', component: SalesOrderList },
     { path: '/:notFound(.*)', component: NotFound }
   ]
 });
 
 export default router;