import Search from "@/views/search.vue";
import { mount } from "@vue/test-utils";

let wrapper;

describe("Search page", () => {
  it("displays one input(structure unit test)", async () => {
    wrapper = mount(Search, {});

    // get
    const el_form_items = wrapper.findAll("input");

    expect(el_form_items).toHaveLength(1);
    expect(el_form_items.at(0).isVisible()).toBe(true);
  });

  it("displays one button(structure unit test)", async () => {
    wrapper = mount(Search, {});

    // get
    const el_form_items = wrapper.findAll("button");

    expect(el_form_items).toHaveLength(1);
    expect(el_form_items.at(0).isVisible()).toBe(true);
  });

  it("displays a logo image(structure unit test)", async () => {
    wrapper = mount(Search, {});

    // get
    const el_form_items = wrapper.findAll("img");

    expect(el_form_items).toHaveLength(1);
    expect(el_form_items.at(0).isVisible()).toBe(true);
  });
});
