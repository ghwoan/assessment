<template>
  <div>
  <h2>Sales Order Listing</h2>
  <div style="text-align:right;padding-right:20px;">
    <button  id="show-modal" @click="showModal = true">Filter</button>
  </div>  

  <div>
    <sales-orders-table :data="orders"></sales-orders-table>
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
        <sales-orders-filter :initFilters="filters" @close="showModal = false" @apply="onApplyFilter"></sales-orders-filter>
      </template>
      <template #footer>
        <div></div>
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

