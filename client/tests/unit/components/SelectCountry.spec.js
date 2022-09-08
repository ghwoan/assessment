import { http } from '@/utils/http';
import { shallowMount, mount } from '@vue/test-utils';
import SelectCountry from '../../../src/components/controls/SelectCountry.vue';


describe('SelectCountry.vue', () => {
  xit('renders SelectCountry empty countryList', () => {
    const msg = 'All';
    const wrapper = shallowMount(SelectCountry, {
      props: {  value: "China"}
    })
    console.log(wrapper.html());
    expect(wrapper.props().value).toBe('China');
    expect(wrapper.text()).toMatch(msg);
  })

  xit('renders SelectCountry with countryList', async () => {
    const wrapper = await mount(SelectCountry, {
      props: {  value: "China"}
    });
    await wrapper.setData({ selected: "Indonesia", countryList: [{ country: "Indonesia" }, { country: "China" }]});
    
   // expect(wrapper.text()).toMatch(msg);
    expect(wrapper.html()).toMatchSnapshot();
   
  })

  //a mock return of the getCountryList
  http.get = jest.fn().mockResolvedValue(
    { data: { data: [{ country: "Malaysia" }, { country: "Singapore" }] } });
  
  xit('renders SelectCountry with countryList2', async () => {
    const wrapper = await mount(SelectCountry, {
      props: {  value: "Malaysia"}
    });
    console.log(wrapper.html());
    expect(wrapper.html()).toMatchSnapshot();
   
  })
})
