<template>
  <div>
  
  <h2>Sales Order Listing</h2>

  <div>
  <button  id="show-modal" @click="showModal = true">Show Modal</button>
  </div>

    <div v-if="orders.length">
      <table>
        <tr v-for="(order,index) in orders" :key="index">
          <td>{{order.customer_name}}</td>
          <td>{{order.status}}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      No orders
    </div>

  </div>

  <Teleport to="body">
    <!-- the modal dialog to filter data -->
    <app-modal :show="showModal" @close="showModal = false">
      <template #header>
       <div>
        <h3>Filters</h3>
        <div>Select criteria filter in listing</div>
      </div>
      </template>
      <template #body>
        <h3>filter here</h3>
        <sales-orders-filter></sales-orders-filter>
      </template>
    </app-modal>
  </Teleport>

</template>
<script src="./SalesOrdersList.js"></script>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

