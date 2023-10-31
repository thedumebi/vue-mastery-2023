<template>
  <div>
    <p>{{ num }}</p>
    <p>{{ double }}</p>
    <button type="button" @click.prevent="increment">Click Me</button>

    <p>{{ name }}</p>

    <p>
      <input type="text" v-model="phrase">
    </p>
    <p>{{ reversedPhrase }}</p>

    <AppAlert :user="user" ref="alert" />

    <button type="button" ref="btn">Button</button>
  </div>
</template>

<!-- <script>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import AppAlert from './components/Alert.vue'
import { useNumber } from './hooks/number'
import { usePhrase } from './hooks/phrase'

export default {
  name: "App",
  components: {
    AppAlert
  },
  setup() {
    const btn = ref(null)
    const alert = ref(null)

    onBeforeMount(() => {
      console.log('onBeforeMount()')
    })

    onMounted(() => {
      console.log('onMounted()')

      btn.value.addEventListener('click', () => {
        console.log('button clicked')
      })

      alert.value.shout()
    })

    const user = reactive({
      name: 'DMB',
      age: 25
    })

    setTimeout(() => {
      user.name = 'Dumebi'
    }, 3000)

    const { num, increment, double } = useNumber()
    const { phrase, reversedPhrase, num: phraseNum } = usePhrase()

    return{
      num,
      increment,
      double,
      user,
      ...toRefs(user),
      phrase,
      reversedPhrase,
      btn,
      alert,
      phraseNum
    }
  }
};
</script> -->

<!-- 
  by adding setup attribute to the script tag
  code written inside the script block will be wrapped by the setup function
  that means we dont have to export an object nor do we need to add the setup function
  wecan safely remove the export statement. Do not remove the inner contents of the object.
  then you also remove the name, components and setup lines. dont remove the inner contents of setup.
  remove the return statement. You do not need to return value. vue would automatically export functions and variables defined in the block.
  For the components, if you import a component it would automatically be registered under the components.
  to register the name it gets infered from the file name but you have the option of adding an additional script alongside the script block with the setup attribute like so:
 -->
<script>
  export default {
    name: 'MainApp'
  }
</script>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import AppAlert from './components/Alert.vue'
import { useNumber } from './hooks/number'
import { usePhrase } from './hooks/phrase'

const btn = ref(null)
const alert = ref(null)

onBeforeMount(() => {
  console.log('onBeforeMount()')
})

onMounted(() => {
  console.log('onMounted()')

  btn.value.addEventListener('click', () => {
    console.log('button clicked')
  })

  alert.value.shout()
})

const user = reactive({
  name: 'DMB',
  age: 25
})
const { name } = toRefs(user)

setTimeout(() => {
  user.name = 'Dumebi'
}, 3000)

const { num, increment, double } = useNumber()
const { phrase, reversedPhrase, num: phraseNum } = usePhrase()
</script>
