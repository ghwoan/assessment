<template>
<div class="table-container">
  <div class="tcolumn thead">
        <div class="th">Order No</div>
        <div class="th" @click="sortBy('customer_name')" >Customer Name 
           <span class="arrow" :class="sortOrder.customer_name" ></span>
        </div>
        <div class="th" @click="sortBy('status')">Status 
           <span class="arrow" :class="sortOrder.status" ></span>
        </div>
        <div class="th" @click="sortBy('category')">Category 
           <span class="arrow" :class="sortOrder.category" ></span>
        </div>
        <div class="th" @click="sortBy('country')">Country 
           <span class="arrow" :class="sortOrder.country" ></span>
        </div>
        <div class="th" @click="sortBy('created_date')">Created Date 
           <span class="arrow" :class="sortOrder.created_date" ></span>
        </div>
  </div>

    <div v-if="orders && orders.length">    
      <div v-for="(order,index) in sortedData" :key="index" class="tcolumn trow"  :class="(index%2==0)? 'even' : 'odd'">
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
         orders: [],
         sortField: '',
         sortOrder: {customer_name:"asc", status:"asc", category: "asc", country:"asc", created_date: "asc"} 
      };
   },
  watch: {
      data: function (value) {
       //  console.log(value);
         this.orders = value;
      },
  },
  computed: {
      sortedData: function () {
        if (!this.sortField) return this.orders;
        return this.sortOrdersByString(this.sortField, this.sortOrder[this.sortField]);
     },
  },
   methods: {
      sortBy: function(fieldName){
        this.sortField = fieldName;
        if(this.sortOrder[fieldName]=="asc"){
          this.sortOrder[fieldName] = "dsc";
        }else{
          this.sortOrder[fieldName] = "asc";
        }
        },
    // to format the date to display format
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
      ,
      sortOrdersByString(fieldName, sortOrder) {
      
         let sorted = [...this.orders].sort((a, b) => {
            let al = a[fieldName].toLowerCase();
            let bl = b[fieldName].toLowerCase();
            
            if (al < bl) {
               return -1;
            }
            if (al > bl) {
               return 1;
            }
            return 0;
         });
         if (sortOrder!="asc"){
          sorted = sorted.reverse();
         }
         return sorted;
      }


   }
}
</script>

<style scoped>

.table-container {
  display: grid;
  grid-template-rows: auto;

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
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>

