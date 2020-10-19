import NavBar from '@/components/Navbar.vue'
import { mount } from '@vue/test-utils'

let wrapper

describe('Search page', () => {
  it('displays two page links(structure unit test)', async () => {
    wrapper = mount(NavBar, {});

    // get
    const el_form_items = wrapper.findAll('li');

    expect(el_form_items).toHaveLength(2);
    expect(el_form_items.at(0).isVisible()).toBe(true);
    expect(el_form_items.at(1).isVisible()).toBe(true);
  });
})