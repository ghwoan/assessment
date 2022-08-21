<template>
<select v-model="selectedCustomer" @change="onChange">
   <option value="-">All</option>
   <option v-for="customer in customerList" :key="customer.customer_name" :value="customer.customer_name">
   {{customer.customer_name}}</option>
</select>
</template>

<script>
import { getCustomerList } from '../../data/salesorders.js';

export default {
   props: {
    value: String
   },
   data() {
      return {
         selectedCustomer: this.value,
         customerList: []
      };
   },
   created() {
      this.fetchCustomerList();
   },
   mounted(){

   },
   watch: {
      value: function(newVal){
         console.log(newVal);
         this.selectedCustomer = newVal;
      }
   },
   methods:{
      //fetch customer list from the server
      fetchCustomerList: function() {
         getCustomerList()
            .then(response => {
               if (response && response.data) {
                  this.customerList= response.data.data;
               }
            })
            .catch(e => {
               console.log(e); 
         })
      },
      //handle on customer selection change
      onChange: function(event){
         this.$emit("valueChange", event.target.value);
      }
   }
}
</script>
<style scoped>

</style>
