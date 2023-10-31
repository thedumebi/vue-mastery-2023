<template>
    <div v-if="!flag" style="color: red">Name Changed!</div>
</template>

<script>
import { computed } from "vue"

export default {
  name: "Alert",
  props: ['user'],
  emits: ['eventName'],
  setup(props, context) {
    context.emit('eventName', {})

    const flag = computed(() => props.user.name === 'DMB')

    const shout = () => {
      console.log("Shouting!!!!!")
    }

    return { flag, shout }
  }
}
</script>
