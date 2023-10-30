import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import AboutVue from '@/views/About.vue'

describe('AboutVue', () => {
  test('renders inner text', () => {
    // this creates an instance
    /**
     * shallowMount is different from mount because it would limit
     * the number of children components the component may have.
     * The mount function would allow the component to load as many children as it may have
     * shallowMount limits to one level. If the child loads a component it won't load.
     * you can also use mount and pass in shallow true i.e.
     * const wrapper = mount(AboutVue, { shallow: true }) is same as
     * const wrapper = shallowMount(AboutVue)
     * to get the same effect
     */
    const wrapper = mount(AboutVue, { shallow: true })
    expect(wrapper.text()).toContain('This is an about page')
  })
})
