<template>
  <AppHeader />

  <router-view #default="{ Component }">
    <!-- because of transition tag you need to ensure your components have one parent base tag. This is why in Home.vue and Song.vue we use the main tag to wrap the sections -->
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <app-player />

  <auth-modal />
</template>

<script>
import { mapWritableState } from 'pinia'
import AuthModal from './components/AuthModal.vue'
import { auth } from '@/includes/firebase'
import { useUserStore } from '@/stores/user'
import AppHeader from './components/Header.vue'
import AppPlayer from './components/Player.vue'

export default {
  name: 'App',
  components: {
    AuthModal,
    AppHeader,
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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5 linear;
  opacity: 0;
}
</style>
