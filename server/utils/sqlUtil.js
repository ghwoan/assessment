
export const createDateRangeFilter = (fieldName, prefix, startDate, endDate) => {
   let sql = "";
   if (startDate) {
      sql = fieldName + " >= '" + startDate + "'";
   }
   if (endDate) {
      if (sql) {
         sql = sql + " AND ";
      }
      sql = sql + fieldName + " <='" + endDate + "'";
   }
   if (sql) {
      sql = " (" + sql + ")";
      if (prefix) {
         sql = prefix + " AND " + sql;
      }
   } else {
      sql = prefix;
   }
   return sql;
}

//define enum for FieldType
export const FieldTypeEnum = {
   NUMBER : 1,
   STRING : 2
}

export const escapeChar = (value) => {
   if (!value) {
      return value;
   } else {
      return "'" + value.split("'").join("\\'") + "'";
   }
}

export const createOpFilter = (fieldName, prefix, opFilter, fieldType) => {
   let sql = prefix;
   let items = "";
  
   if (!opFilter || !opFilter.list) {
      return prefix;
   };
   console.log(opFilter.list);
   if (opFilter.list.length) {
      opFilter.list.forEach(c => {
         if (items) items = items + ",";
         if (fieldType == FieldTypeEnum.NUMBER) {
            items = items + c;   
         } else {
            items = items +  escapeChar(c) ;
         }
      });
   }
   if (items) {
      items = "(" + items + ")";
      if (opFilter.op == "IN") {
         items = fieldName + " IN " + items;
      } else[
         items = fieldName + " NOT IN " + items
      ]
      sql = sql  + " AND (" + items + ")";
   }
   return sql;
}