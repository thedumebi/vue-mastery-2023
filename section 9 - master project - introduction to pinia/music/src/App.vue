<template>
  <AppHeader />

  <!-- <router-view #default="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> -->

  <router-view></router-view>

  <app-player />

  <auth />
</template>

<script>
import { mapWritableState } from 'pinia'
import Auth from './components/Auth.vue'
import { auth } from '@/includes/firebase'
import { useUserStore } from '@/stores/user'
import AppHeader from './components/Header.vue'
import AppPlayer from './components/Player.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Auth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>
