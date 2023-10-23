// const vm = Vue.createApp({
//   data () {
//     return {
//       firstName: 'Daniel',
//       middleName: '',
//       lastName: 'Chiwuzoh',
//       url: 'https://google.com',
//       raw_url: '<a href="https://google.com" target="_blank">Google<a/>',
//       age: 25
//     }
//   },
//   methods : {
//     increment () {
//       this.age++
//     },
//     updateLastName (event, msg) {
//       // event.preventDefault()

//       // console.log(msg)

//       this.lastName = event.target.value
//     },
//     updateMiddleName (event) {
//       this.middleName = event.target.value
//     }
//   },
//   computed: {
//     fullName () {
//       return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`
//     }
//   },
//   watch: {
//     age (newVal, oldVal) {
//       setTimeout(() => {
//         this.age = 25
//       }, 3000)
//     }
//   }
// }).mount('#app')

// setTimeout(() => {
//   vm.firstName = 'DMB'
// }, 2000)

// Vue.createApp({
//   data () {
//     return {
//       firstName: 'Dumebi',
//       lastName: 'Chiwuzoh'
//     }
//   }
// }).mount('#app2')


// const vm = Vue.createApp({
//   data () {
//     return {
//       isPurple: false,
//       selectedColor: '',
//       size: 150
//     }
//   },
//   computed: {
//     circle_classes () {
//       return { purple: this.isPurple }
//     },
//     circle_styles () {
//       return [{
//         width: `${this.size}px`,
//         height: `${this.size}px`,
//         lineHeight: `${this.size}px`
//       }, {
//         transform: 'rotate(30deg)'
//       }]
//     }
//   }
// }).mount('#app')


const vm = Vue.createApp({
  data() {
    return {
      mode: 1,
      birds: ['Pigeons', 'Eagles', 'Doves', 'Parrots'],
      people: [
        { name: 'John', age: 20 },
        { name: 'Rick', age: 18 },
        { name: 'Amy', age: 33 }
      ]
    }
  }
}).mount('#app')
