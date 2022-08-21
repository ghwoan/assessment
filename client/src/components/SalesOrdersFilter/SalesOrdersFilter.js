
//import { http } from '../../utils/http.js';
import AppModal from '../../components/AppModal/AppModal.vue';

export default {
   components: {
      AppModal
   },
   props: {
      initialFilters: {}
   },
   data() {
      return {
         filters: {startDate:'', endDate:''},
         showModal: false,
         apply: false
      };
   },
   mounted() {
    
   },
   destroy() {

   },
   watch: {
      filters: (value) => {
         console.log(value);
      }
   },
   methods: {
     
   }
   
}