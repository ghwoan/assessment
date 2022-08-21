<template>
<div class="table-container">
  <div class="tcolumn thead">
        <div class="th">Order No</div>
        <div class="th">Customer Name</div>
        <div class="th">Status</div>
        <div class="th">Category</div>
        <div class="th">Country</div>
        <div class="th">Created Date</div>
  </div>

    <div v-if="orders && orders.length">    
      <div v-for="(order,index) in orders" :key="index" class="tcolumn trow"  :class="(index%2==0)? 'even' : 'odd'">
        <div  class="tcell left">{{index +1}}</div>
        <div class="tcell left">{{order.customer_name}}</div>
        <div class="tcell left">{{order.status}}</div>
        <div class="tcell left">{{order.category}}</div>
        <div class="tcell left">{{order.country}}</div>
        <div class="tcell left">{{formatDate(order.created_date)}}</div>
      </div>
    </div>
    <div v-else>
        <div class="tcell">
          No orders
        </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    data: []
  },
  data() {
      return {
         orders: []
      };
   },
  watch: {
      data: function (value) {
       //  console.log(value);
         this.orders = value;
      },
  },
   methods: {
      formatDate: function(date) {
        if(!date){
          return '';
        }
        try{
          const d = new Date(date);
          let strDate = d.toLocaleDateString();
          return strDate;
        }catch(er){
          return '';
        }
        
      }
   }
}
</script>

<style scoped>

.table-container {
  display: grid;
  grid-template-rows: auto;
  border: 1px solid rgba(222, 220, 220, 0.8);
  padding: 10px;
}
.tcolumn {
  display: grid;
  grid-template-columns: 10% 20% 15% 20% 15% 20%;
}
.thead {
  background-color:rgb(12, 41, 60);
  color:rgb(255,255,255);
  font-size:11pt
}
.th{
    padding: 8px;
  border: 1px solid rgba(180, 180, 180, 0.8);
}
.trow {
  padding: 0;
  color:rgb(25,25,25);
  font-size:11pt
}

.trow.even{
    background-color:rgb(242, 245, 250);
}
.trow.odd{
    background-color:rgb(255, 255, 255);
}
.tcell {
   padding: 5px;
}
.tcell.left{
  text-align: left;
  padding-left:10px;
  border: 1px solid rgba(180, 180, 180, 0.8);

}


</style>

