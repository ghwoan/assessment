import {escapeChar} from "../sqlUtil.js";
//const sqlUtil = require('../sqlUtil');

describe("SqlUtil Tests", () => {
   test("escapeChar", () => {
      // arrange and act
      var result = escapeChar("avb")
   
      // assert
      expect(result).toBe("'avb'");
   });

   test("escapeChar with '", () => {
      // arrange and act
      var result = escapeChar("a'vb")
   
      // assert
      expect(result).toBe("'a\\'vb'");
   });
});