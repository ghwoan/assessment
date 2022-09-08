import { shallow, shallowMount } from '@vue/test-utils'
import  AppModal  from '../../src/components/AppModal/AppModal.vue'


describe('AppModal.vue', () => {
  xit('renders AppModal when passed', () => {
    const msg = 'bodyNOYES';
    const wrapper = shallowMount(AppModal, {
      props: { show: true,
        isConfirmModal: true,
        size: "S" }
    })
    expect(wrapper.text()).toMatch(msg);
  })
})
