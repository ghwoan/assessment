
import { http } from '../../utils/http.js';
import AppModal from '../../components/AppModal/AppModal.vue';
import SalesOrdersFilter from '../../components/SalesOrdersFilter/SalesOrdersFilter.vue';

export default {
   components: {
      AppModal,
      SalesOrdersFilter
    },
   data() {
      return {
         orders: [],
         timer: null,
         showModal: false
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
   watch: {
      orders: (value) => {
         console.log(value);
      }
   },
   methods: {
      fetchData: function() {
         console.log("fetchData");
         http.get(`orders`)
            .then(response => {
               this.orders = response.data.data;
            })
            .catch(e => {
               console.log(e);
            })
      }
   }
   
}