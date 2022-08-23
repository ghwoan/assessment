import { shallowMount } from '@vue/test-utils'
import  AppModal  from '@/components/AppModal/AppModal.vue'


describe('AppModal.vue', () => {
  it('renders AppModal when passed', () => {
    const msg = 'bodyNOYES';
    const wrapper = shallowMount(AppModal, {
      props: { show: true,
        isConfirmModal: true,
        size: "S" }
    })
    expect(wrapper.text()).toMatch(msg);
  })
})
