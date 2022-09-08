<template>
<div style="height:80%">
  <div class="grid-container">
    <div class="grid-row border">
    <div class="grid-item col-1">Created Date</div>
    <div class="grid-item cell-2">
          <table>
        <tbody>
        <tr><td>Display range from</td>
        <td><input type="date" v-model="filters.startDate" @change="onDateChange($event,'startDate')"/></td>
        <td style="padding: 0 10px">to</td>
        <td><input type="date" v-model="filters.endDate" :min="filters.startDate" @change="onDateChange($event,'endDate')"/></td>
        </tr>
        </tbody>
        </table>
        </div>
    </div>
    <div class="grid-row border">
      <div class="grid-item col-1">Customer name</div>
      <div class="grid-item cell-2">
        <select-customer :value="customerName" @valueChange="onCustomerChange"></select-customer>
      </div>
    </div>
    <div class="grid-row  border">
      <div class="grid-item col-1">Status</div>
      <div class="grid-item cell-2">
        <div class="grid-chkGroup">
          <div class="grid-chkGroup-item">
            <input type="checkbox" value="0" v-model="statusState[0]"  @change="onStatusChange($event)"/>
            <label for="checkbox">All</label>
          </div>
           <div class="grid-chkGroup-item">
            <input type="checkbox" value="1" v-model="statusState[1]" @change="onStatusChange($event)"/>
            <label for="checkbox">Open</label>
          </div>
           <div class="grid-chkGroup-item">
            <input type="checkbox" value="2" v-model="statusState[2]"  @change="onStatusChange($event)"/>
            <label for="checkbox">Processing</label>
          </div>
          <div class="grid-chkGroup-item">
            <input type="checkbox" value="3" v-model="statusState[3]"   @change="onStatusChange($event)"/>
            <label for="checkbox">Accepted</label>
          </div>
          <div class="grid-chkGroup-item">
            <input type="checkbox" value="4" v-model="statusState[4]"   @change="onStatusChange($event)"/>
            <label for="checkbox">Rejected</label>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-row  border">
      <div class="grid-item col-1">Category</div>
      <div class="grid-item border">
        <div class="grid-chkGroup">
          <div class="grid-chkGroup-item">
            <input type="checkbox" value="0" v-model="categoryState[0]"  @change="onCategoryChange($event)"/>
            <label for="checkbox">All</label>
          </div>
           <div class="grid-chkGroup-item">
            <input type="checkbox" value="1" v-model="categoryState[1]" @change="onCategoryChange($event)"/>
            <label for="checkbox">Electronics</label>
          </div>
           <div class="grid-chkGroup-item">
            <input type="checkbox" value="2" v-model="categoryState[2]"  @change="onCategoryChange($event)"/>
            <label for="checkbox">Furniture</label>
          </div>
          <div class="grid-chkGroup-item">
            <input type="checkbox" value="3" v-model="categoryState[3]"   @change="onCategoryChange($event)"/>
            <label for="checkbox">Others</label>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-row">
      <div class="grid-item col-1">Country</div>
      <div class="grid-item cell-2">
        <select-country :value="countryName" @valueChange="onCountryChange"></select-country></div>
    </div>
  </div>
 <div class="grid-row">
      <div class="grid-item"><button  id="show-modal" @click="onReset">Reset</button></div>
      <div class="grid-item right">
        <button class="buttonToRight" id="show-modal" @click="onClose">Close</button>
        <button class="buttonToRight" id="show-modal" @click="onApply">Apply</button>
    </div>
 </div>


  <Teleport to="body">
    <!-- the modal dialog to filter data -->
    <app-modal :show="showConfirmModal" isConfirmModal=true size="S" @confirm="onApply" @close="onConfirmClose">
      <template #header>
        <h3>Confirmation</h3>
      </template>
      <template #body>
        <div>Would you like to apply the changes?</div>
      </template>
    </app-modal>
  </Teleport>
  
</div>
</template>
<script src="./SalesOrdersFilter.js"></script>
<style scoped>
@import "./SalesOrdersStyle.css";
</style>

