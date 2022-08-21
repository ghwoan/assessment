<template>
<div>
  <table>
  <tbody>
  <tr><td>Created Date</td><td>Display range from</td><td><input v-model="startDate" /></td></tr>
  <tbody>
  </table>
  
  <button  id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- the modal dialog to filter data -->
    <app-modal :show="showModal" @close="showModal = false">
      <template #header>
        <div>Confirmation</div>
      </template>
      <template #body>
        <h3>Are you sure?</h3>
      </template>
    </app-modal>
  </Teleport>
</div>
</template>
<script src="./SalesOrdersFilter.js"></script>
