<template>
  <div class="result">
    <div class="title">{{ results[resultIndex].title }}</div>
    <div class="desc">{{ results[resultIndex].desc }}</div>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: {
    results: {
      type: Array,
      default() {
        return [
          {
            min: 0,
            max: 2,
            title: "Try again!",
            desc: "Do a little more studying and you may succeed!",
          },
        ]
      },
    },
    totalCorrect: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    resultIndex() {
      return this.results.findIndex(
        (result) =>
          result.min <= this.totalCorrect && result.max >= this.totalCorrect
      )
    },
  },
}
</script>
