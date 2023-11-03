<template>
  <div id="app">
    <app-action style="opacity: 0.5" />
  </div>
</template>

<script>
import AppAction from "@/components/Action.vue";

export default {
  name: "App",
  components: {
    AppAction,
  },
  data() {
    return {
      open: false
    };
  },
};
</script>

<style src="bootstrap/dist/css/bootstrap.css"></style>
