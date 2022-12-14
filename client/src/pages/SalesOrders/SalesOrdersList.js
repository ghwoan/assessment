
import { getSalesOrders } from '../../data/salesorders.js';
import AppModal from '../../components/AppModal/AppModal.vue';
import SalesOrdersFilter from '../../components/SalesOrdersFilter/SalesOrdersFilter.vue';
import SalesOrdersTable from '../../components/SalesOrdersTable/SalesOrdersTable.vue';

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
      this.getHistoryFilters();
      this.fetchData();
   },
   destroyed() {
      if(this.timer){
         clearTimeout(this.timer);
      }
   },
   methods: {
      //to fetch the server sales orders data
      fetchData: function () {
         getSalesOrders(this.filters).then(response => {
            this.orders = response.data.data;
            this.setNextFetch();
         })
            .catch(e => {
               console.log(e);
               this.setNextFetch();
            });
      },
      //set the next timer to fetch data
      setNextFetch: function () {
         if (this.timer) {
            clearTimeout(this.timer);
         }
         this.timer = setTimeout(this.fetchData, 60 * 1000);
      },
      //get the filter history
      getHistoryFilters() {
         if (!localStorage) return;
         try {
            let filters = localStorage.getItem("sales-order-filter");
            if (filters) {
               this.filters = JSON.parse(filters);
            }  
         } catch (er) {
            console.log(er); 
         }
      },
      //save the filters to session
      saveFilters() {
         if (localStorage && this.filters) {
            localStorage.setItem("sales-order-filter",JSON.stringify(this.filters));
         }
      },
      //handle filter changes
      onApplyFilter: function (filters) {
         this.filters = filters;
         this.showModal = false;
         this.fetchData();
         this.saveFilters();
      }
   }
   
}