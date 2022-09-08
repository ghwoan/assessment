import { shallow, shallowMount } from '@vue/test-utils'
import  SelectCustomer  from '../../../src/components/controls/SelectCustomer.vue'


describe('SelectCustomer.vue', () => {
  xit('renders SelectCustomer when passed', () => {
    const msg = 'All';
    const wrapper = shallowMount(SelectCustomer, {
      props: {  selected: "",
         countryList: [] }
    })
    expect(wrapper.text()).toMatch(msg);
  })
})
