import AppModal from '../../components/AppModal/AppModal.vue';
import SelectCustomer from './SelectCustomer.vue';
import SelectCountry from './SelectCountry.vue';

const StatusEnum = {
   ALL: 0,
   OPEN: 1,
   PROCESSING: 2,
   ACCEPTED: 3,
   REJECTED: 4
};
 
const CategoryEnum = {
   ALL: 0,
   ELECTRONICS: 1,
   FURNITURE: 2,
   OTHERS: 3
};

export default {
   components: {
      AppModal,
      SelectCustomer,
      SelectCountry
   },
   props: {
      initFilters: {}
   },
   data() {
      return {
         filters: {startDate:'', endDate:''},
         showConfirmModal: false,
         customerName: "-",
         countryName: "-",
         statusState: [true, false, false, false, false],
         categoryState: [true, false, false, false],
         touched: false
      };
   },
   created() {

   },
   mounted() {
      this.init();
   },
   destroy() {

   },
   watch: {
      filters: (value) => {
         console.log(value);
      }
   },

   methods: {
      init: function () {
         let def = this.initFilters;
         if (!def) {
            return;
         }
         if (def.startDate) {
            this.filters.startDate = def.startDate;
         }
         if (this.initFilters.endDate) {
            this.filters.endDate = def.endDate;
         }
         if (def.customerFilter && def.customerFilter.list) {
            if (def.customerFilter.list.length>0) {
               this.customerName = def.customerFilter.list[0];
            }
         }
         this.initStatusFilter(def.statusFilter);
         this.initCategoryFilter(def.categoryFilter);

         if (def.countryFilter && def.countryFilter.list) {
            if (def.countryFilter.list.length>0) {
               this.countryName = def.countryFilter.list[0];
            }
         }
      },
      initStatusFilter: function (statusFilter) {
         if (statusFilter && statusFilter.list && statusFilter.list.length>0) {
            statusFilter.list.forEach((s) => {
                  try {
                     let i = StatusEnum[s.toUpperCase()];
                     this.statusState[i] = true;
                  } catch (er) {
                     console.log(er);
                  }
               }
            )
            if (this.statusState.find(c => c===false)!=undefined) {
               this.statusState[0] = false;
            }
         } else {
            let a = this.statusState.map(() => true );
            this.statusState = a;
         }
      },
      initCategoryFilter: function (categoryFilter) {
         if (categoryFilter && categoryFilter.list && categoryFilter.list.length > 0) {
            //handle IN case
            if (categoryFilter.op == "IN") {
               categoryFilter.list.forEach((s) => {
                  try {
                     if (s==this.getCategoryId(CategoryEnum.ELECTRONICS)) {
                        this.categoryState[CategoryEnum.ELECTRONICS] = true;
                     } else if (s == this.getCategoryId(CategoryEnum.FURNITURE)) {
                        this.categoryState[CategoryEnum.FURNITURE] = true;
                     }
                  } catch (er) {
                     console.log(er);
                  }
               });
 
            } else {
               //handle exclusion case
               this.categoryState[CategoryEnum.OTHERS] = true;
               this.categoryState[CategoryEnum.ELECTRONICS] = true;
               this.categoryState[CategoryEnum.FURNITURE] = true;
               categoryFilter.list.forEach((s) => {
                  try {
                     if (s==this.getCategoryId(CategoryEnum.ELECTRONICS)) {
                        this.categoryState[CategoryEnum.ELECTRONICS] = false;
                     } else if (s == this.getCategoryId(CategoryEnum.FURNITURE)) {
                        this.categoryState[CategoryEnum.FURNITURE] = false;
                        this.categoryState[0] = false;
                     }
                  } catch (er) {
                     console.log(er);
                  }
               });
            }
            console.log(this.categoryState);
            if (this.categoryState.find(c => c===false)!=undefined) {
               this.categoryState[0] = false;
            }
         } else {
            let a = this.categoryState.map(() => true );
            this.categoryState = a;
         }
      },
      hasChanges: function () {
         let newFilters = this.getNewFilters();
         if (newFilters && this.filters) {
            console.log(JSON.stringify(newFilters));
            console.log(JSON.stringify(this.initFilters));
            if (JSON.stringify(newFilters) == JSON.stringify(this.initFilters)) {
               return false;
            } else {
               return true;
            }
         }
         return false; 
      },
      //handle on Close button clicks
      onClose: function () {
         if (this.hasChanges()) {
            this.showConfirmModal = true;
         } else {
            this.onConfirmClose();
         }
      },
      //handle on Confirm Close button clicks
      onConfirmClose: function () {
         this.showConfirmModal = false;
         this.$emit("close");
      },
      //handle on Apply button clicks
      onApply: function () {
         let filters = this.getNewFilters();
         if (filters) {
            this.$emit("apply", filters);   
         } else {
            this.$emit("close");
         }
      },
      //to get the new filters
      getNewFilters: function () {
         let filters = {...this.filters};

        
         //update customer filters
         if (this.customerName && this.customerName!="-") {
            filters["customerFilter"] = {list:[this.customerName], op: "IN"};
         }
         //update status Filters
         let statusFilter = this.getStatusFilters();
         if (statusFilter) {
            filters["statusFilter"] = statusFilter;
         }
         //get the category filters
         let categoryFilter = this.getCategoryFilters();
         if (categoryFilter) {
            filters["categoryFilter"] = categoryFilter;
         }

         //get the country filters
         if (this.countryName && this.countryName!="-") {
            filters["countryFilter"] = {list:[this.countryName], op: "IN"}; 
         }
         return filters;
      },
      //create status filters
      getStatusFilters: function () {
         console.log(this.statusState);
         //if include all, no filter required
         if (this.statusState[0]) {
            return undefined;
         }
         let list = [];
         for (let i = 1; i < this.statusState.length; i++) {
            if (!this.statusState[i]) {
               continue;
            }
            if (i == StatusEnum.OPEN) {
               list.push("Open");
            } else if (i == StatusEnum.ACCEPTED) {
               list.push("Accepted");
            } else if (i == StatusEnum.PROCESSING) {
               list.push("Processing");
            } else if (i == StatusEnum.REJECTED) {
               list.push("Rejected");
            }
         }
         console.log(list);
         if (list.length > 0) {
           return { list: list , op: "IN" };
         } else {
            return undefined;   
         }
          
      },
      //create the category filters
      getCategoryFilters: function () {
         let filter = { list: [], op: "IN" };
         //if include all, no filter required
         if (this.categoryState[0]) {
            return undefined;
         }
         //if others selected, us exclusion else use Inclusion
         if (this.categoryState[CategoryEnum.OTHERS]) {
            filter.op = "NOT_IN";
            for (let i = 1; i < this.categoryState.length - 1; i++) {
               //get only those not checked
               if (!this.categoryState[i]) {
                  filter.list.push(this.getCategoryId(i));
               }
            }
         } else {
            for (let i = 1; i < this.categoryState.length - 1; i++) {
               //get only those checked
               if (this.categoryState[i]) {
                  filter.list.push(this.getCategoryId(i));
               }
            }
         }
         if (filter.list.length > 0) {
            return filter;
         } else{
            return undefined;
         }
        
      },
      //get the category Id by enum
      //temporary hardcode
      getCategoryId: function (categoryEnum) {
         if (categoryEnum == CategoryEnum.ELECTRONICS) {
            return 1;
         } else if (categoryEnum == CategoryEnum.FURNITURE) {
            return 2;
         }
      },
      onReset: function () {
         this.filters.startDate = "";
         this.filters.endDate = "";
         this.customerName = "-";
         this.countryName = "-";
         this.statusState = [true, true, true, true, true];
         this.categoryState = [true, true, true, true];

      },
      onDateChange: function (event, type) {
         this.filters[type] = event.target.value;
         console.log(this.filters);
         if (this.filters.endDate && this.filters.startDate) {
            if (this.filters.endDate < this.filters.startDate) {
               this.filters.endDate = '';  
            }
         }
      },
      onCustomerChange: function (value) {
         console.log(value);
         this.customerName = value;
      },
      onCountryChange: function (value) {
         console.log(value);
         this.countryName = value;
      },
      onStatusChange: function (event) {
         console.log(StatusEnum.ACCEPTED);
         if (event.target.value == StatusEnum.ALL) {
            let a = this.statusState.map(() => event.target.checked);
            this.statusState = a;
         }
         if (event.target.value < 5) {
            this.statusState[event.target.value] = event.target.checked;
            if (event.target.value != StatusEnum.ALL) {
               if (this.statusState.find(c => c===false)!=undefined) {
                  this.statusState[0] = false;
               }
            }
            /*if (event.target.checked == false && this.statusState[0] == true) {
               this.statusState[0] = false;
            }*/
            console.log(this.statusState);
         
         }
         
      },
      onCategoryChange: function (event) {
       
         if (event.target.value == CategoryEnum.ALL) {
            let a = this.categoryState.map(() => event.target.checked);
            this.categoryState = a;
         }
         if (event.target.value < 4) {
            this.categoryState[event.target.value] = event.target.checked;
            if (event.target.value != CategoryEnum.ALL) {
               if (this.categoryState.find(c => c===false)!=undefined) {
                  this.categoryState[0] = false;
               }
            }
        }
      },
   }
   
}