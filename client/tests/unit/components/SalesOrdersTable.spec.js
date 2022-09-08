import { http } from '@/utils/http';
import { shallowMount, mount } from '@vue/test-utils';
import SalesOrdersTable from '../../../src/components/SalesOrdersTable/SalesOrdersTable.vue';


describe('SalesOrdersTable.vue', () => {
  it('renders empty', () => {
    const msg = 'Order No Customer Name Status Category Country Created Date  No orders';
    const wrapper = shallowMount(SalesOrdersTable, {
      props: {  data: undefined}
    })
    //console.log(wrapper.html());
    // expect(wrapper.text()).toMatch(msg);
     expect(wrapper.html()).toMatchSnapshot();
  })

  it('renders data', async () => {
   const msg = 'Order No Customer Name Status Category Country Created Date  No orders';
   const wrapper = mount(SalesOrdersTable, {
     props: {  data: undefined}
   })
   await wrapper.setData({orders: [{orderId:"1",customerName: "B", country: "Indonesia" }, {orderId:"2", customerName:"A", country:"China" }]});
   expect(wrapper.html()).toMatchSnapshot();
 })

  it('method formatDate', async () => {
    const wrapper = await mount(SalesOrdersTable, {});
   // expect(wrapper.text()).toMatch(msg);
     let strDate = "2020-05-01";
     expect(wrapper.vm.formatDate(strDate)).toBe("01/05/2020");
     strDate = "2020-05-01T00:21:21";
     expect(wrapper.vm.formatDate(strDate)).toBe("01/05/2020");
     strDate = "2020-05-01 00:21:21";
     expect(wrapper.vm.formatDate(strDate)).toBe("01/05/2020");
     strDate = "2020/05/01";
     expect(wrapper.vm.formatDate(strDate)).toBe("01/05/2020");
     strDate = "";
     expect(wrapper.vm.formatDate(strDate)).toBe("");
  })
   
   
   it('method sortOrdersByString', async () => {
      const wrapper = await mount(SalesOrdersTable, {});
      await wrapper.setData({orders: [{orderId:"1", customerName: "Indonesia" }, {orderId:"2", customerName: "China" }]});
  
      let output = wrapper.vm.sortOrdersByString("customerName", "asc");
      expect(output.reduce((t, item) => { return t + item.customerName }, "")).toBe("ChinaIndonesia");
      expect(JSON.stringify(output)).toMatchSnapshot();
 
      output = wrapper.vm.sortOrdersByString("customerName", "dsc");
      expect(output.reduce((t, item) => { return t + item.customerName }, "")).toBe("IndonesiaChina");
      expect(JSON.stringify(output)).toMatchSnapshot();
 
      output = wrapper.vm.sortOrdersByString("customerName", "Abc");
      expect(output.reduce((t, item) => { return t + item.customerName }, "")).toBe("IndonesiaChina");
      expect(JSON.stringify(output)).toMatchSnapshot();
       
      output = wrapper.vm.sortOrdersByString("customerName", undefined);
      expect(output.reduce((t, item) => { return t + item.customerName }, "")).toBe("IndonesiaChina");
      expect(JSON.stringify(output)).toMatchSnapshot();

      output = wrapper.vm.sortOrdersByString("customerName", "");
      expect(output.reduce((t, item) => { return t + item.customerName }, "")).toBe("IndonesiaChina");
      expect(JSON.stringify(output)).toMatchSnapshot();
 
      output = wrapper.vm.sortOrdersByString("orderId", "");
      expect(output.reduce((t, item) => { return t + item.orderId }, "")).toBe("21");
      expect(JSON.stringify(output)).toMatchSnapshot();

      await wrapper.setData({ orders: [{ char: "a"}, { char: "D"}, { char: "c"}, { char: "b"}, { char: "A"}] });
      output = wrapper.vm.sortOrdersByString("char", "asc");
      expect(output.reduce((t, item) => { return t + item.char }, "")).toBe("aAbcD");

      output = wrapper.vm.sortOrdersByString("char");
      expect(output.reduce((t, item) => { return t + item.char }, "")).toBe("DcbAa");
   })

})
