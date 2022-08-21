
import { getSalesOrders } from '../../data/salesorders.js';
import AppModal from '../../components/AppModal/AppModal.vue';
import SalesOrdersFilter from '../../components/SalesOrdersFilter/SalesOrdersFilter.vue';
import SalesOrdersTable from './SalesOrdersTable.vue';

export default {
   components: {
      AppModal,
      SalesOrdersFilter,
      SalesOrdersTable
    },
   data() {
      return {
         orders: [],
         timer: null,
         showModal: false,
         filters: {},
      };
   },
   mounted() {
      this.fetchData();
      this.timer = setInterval(this.fetchData, 5 * 1000);
   },
   destroy() {
      if(this.timer){
         clearInterval(this.timer);
      }
   },
   /*watch: {
      orders: (value) => {
         console.log(value);
      }
   },*/
   methods: {
      fetchData: function() {
        // console.log("fetchData");
      //   http.get(`orders`)
      getSalesOrders(this.filters).then(response => {
               this.orders = response.data.data;
            })
            .catch(e => {
               console.log(e);
            })
      },
      onApplyFilter: function (filters) {
         console.log("onApplyFilters");
         this.filters = filters;
         this.showModal = false;
      }
   }
   
}