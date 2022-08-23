import AppModal from '../../components/AppModal/AppModal.vue';
import SelectCustomer from '../controls/SelectCustomer.vue';
import SelectCountry from '../controls/SelectCountry.vue';

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
   methods: {
      init () {
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
      initStatusFilter (statusFilter) {
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
      initCategoryFilter (categoryFilter) {
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
            if (this.categoryState.find(c => c===false)!=undefined) {
               this.categoryState[0] = false;
            }
         } else {
            let a = this.categoryState.map(() => true );
            this.categoryState = a;
         }
      },
      //check if there is any changes on the filters selection
      hasChanges () {
         let newFilters = this.getNewFilters();
         let oldFilters = {};
         if (this.initFilters) {
            oldFilters = { ...this.initFilters};
         }
         if (!newFilters) {
            newFilters = {};
         }
         if (JSON.stringify(newFilters) == JSON.stringify(oldFilters)) {
            return false;
         } else {
            return true;
         }
      },
      //handle on Close button clicks
      onClose () {
         if (this.hasChanges()) {
            this.showConfirmModal = true;
         } else {
            this.onConfirmClose();
         }
      },
      //handle on Confirm Close button clicks
      onConfirmClose () {
         this.showConfirmModal = false;
         this.$emit("close");
      },
      //handle on Apply button clicks
      onApply () {
         let filters = this.getNewFilters();
         if (filters) {
            this.$emit("apply", filters);   
         } else {
            this.$emit("close");
         }
      },
      //to get the new filters
      getNewFilters () {
         let filters = {};
         if (this.filters.startDate) {
            filters["startDate"] = this.filters.startDate;
         }
         if (this.filters.endDate) {
            filters["endDate"] = this.filters.endDate;
         }
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
      getStatusFilters () {
      //   console.log(this.statusState);
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
         if (list.length > 0) {
           return { list: list , op: "IN" };
         } else {
            return undefined;   
         }
          
      },
      //create the category filters
      getCategoryFilters () {
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
      getCategoryId (categoryEnum) {
         if (categoryEnum == CategoryEnum.ELECTRONICS) {
            return 1;
         } else if (categoryEnum == CategoryEnum.FURNITURE) {
            return 2;
         }
      },
      //handle on Reset clicks
      onReset () {
         this.filters.startDate = "";
         this.filters.endDate = "";
         this.customerName = "-";
         this.countryName = "-";
         this.statusState = [true, true, true, true, true];
         this.categoryState = [true, true, true, true];
      },
      //to handle date filter changes
      onDateChange (event, type) {
         this.filters[type] = event.target.value;
         if (this.filters.endDate && this.filters.startDate) {
            if (this.filters.endDate < this.filters.startDate) {
               this.filters.endDate = '';  
            }
         }
      },
      //to handle customer filter changes
      onCustomerChange (value) {
         this.customerName = value;
      },
      //to handle country filter changes
      onCountryChange (value) {
         this.countryName = value;
      },
      //to handle status filter changes
      onStatusChange (event) {
         console.log(StatusEnum.ACCEPTED);
         if (event.target.value == StatusEnum.ALL) {
            let a = this.statusState.map(() => event.target.checked);
            this.statusState = a;
         }
         if (event.target.value < 5) {
            this.statusState[event.target.value] = event.target.checked;
            if (event.target.value != StatusEnum.ALL) {
               //to uncheck all if either one of it is false
               if (this.statusState.find(c => c===false)!=undefined) {
                  this.statusState[0] = false;
               }
            }
         }
      },
      //to handle category filter changes
      onCategoryChange (event) {
         if (event.target.value == CategoryEnum.ALL) {
            let a = this.categoryState.map(() => event.target.checked);
            this.categoryState = a;
         }
         if (event.target.value < 4) {
            this.categoryState[event.target.value] = event.target.checked;
            if (event.target.value != CategoryEnum.ALL) {          
               //to uncheck all if either one of it is false
               if (this.categoryState.find(c => c===false)!=undefined) {
                  this.categoryState[0] = false;
               }
            }
        }
      },
   }
   
}