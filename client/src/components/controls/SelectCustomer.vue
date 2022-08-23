<template>
<select v-model="selectedCustomer" @change="onChange">
   <option value="-">All</option>
   <option v-for="customer in customerList" :key="customer.customerName" :value="customer.customerName">
   {{customer.customerName}}</option>
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
      value(newVal){
         this.selectedCustomer = newVal;
      }
   },
   methods:{
      //fetch customer list from the server
      fetchCustomerList() {
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
      onChange(event){
         this.$emit("valueChange", event.target.value);
      }
   }
}
</script>
<style scoped>

</style>
