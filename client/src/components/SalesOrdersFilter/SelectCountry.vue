<template>
<select v-model="selected" @change="onChange">
   <option value="-">All</option>
   <option v-for="country in countryList" :key="country.country" :value="country.country">
   {{country.country}}</option>
</select>
</template>

<script>
import { getCountryList } from '../../data/salesorders.js';

export default {
   props: {
    value: String
   },
   data() {
      return {
         selected: this.value,
         countryList: []
      };
   },
   created() {
      this.fetchCountryList();
   },
   mounted(){

   },
   watch: {
      value: function(newVal){
         console.log(newVal);
         this.selected = newVal;
      }
   },
   methods:{
      //fetch country list from the server
      fetchCountryList: function() {
         getCountryList()
            .then(response => {

               if (response && response.data) {
                  this.countryList= response.data.data;
               }
            })
            .catch(e => {
               console.log(e); 
         })
      },
      //handle on country selection change
      onChange: function(event){
         this.$emit("valueChange", event.target.value);
      }
   }
}
</script>
<style scoped>

</style>
