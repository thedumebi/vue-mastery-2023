<template>
  <p>Hey!</p>

  <Greeting :age="age" />
  <user :age="age" @age-changed="updateAge" :ageChangeFn="updateAgeCB" />
</template>

<script>
import User from './components/User.vue';
import Greeting from './components/Greeting.vue';

export default {
  name: 'App',
  components: {
    User,
    Greeting
  },
  data () {
    return {
      age: 23
    }
  },
  methods: {
    updateAge (num) {
      this.age += num
    },
    updateAgeCB (num) {
      this.age += num
    }
  }
}
</script>
