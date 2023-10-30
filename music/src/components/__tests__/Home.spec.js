import { test, describe, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import HomeVue from '@/views/Home.vue'
import SongItem from '@/components/SongItem.vue'

vi.mock('@/includes/firebase', () => ({
  songsCollection: {}
}))
vi.mock('firebase/firestore', () => ({
  query: () => {},
  orderBy: () => {},
  startAfter: () => {},
  limit: () => {},
  getDocs: () => Promise.resolve([]),
}))

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [{}, {}, {}]
    const component = shallowMount(HomeVue, {
      data() {
        return { songs }
      },
      global: {
        mocks: {
          $t: (message) => message
        }
      }
    })

    const items = component.findAllComponents(SongItem)

    expect(items).toHaveLength(songs.length)

    items.forEach((wrapper, i) => {
        expect(wrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
