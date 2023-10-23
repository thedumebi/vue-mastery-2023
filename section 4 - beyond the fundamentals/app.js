const vm = Vue.createApp({
  data() {
    return {
      message: "Hello world!"
    }
  },
  beforeCreate () {
    console.log('beforeCreate() fundtion called!', this.message)
  },
  created () {
    console.log('created() fundtion called!', this.message)
  },
  beforeMount () {
    console.log('beforeMount() fundtion called!', this.$el)
  },
  mounted () {
    console.log('mounted() fundtion called!', this.$el)
  }
})
vm.mount('#app')

// setTimeout(() => {
//   vm.mount('#app')
// }, 3000)