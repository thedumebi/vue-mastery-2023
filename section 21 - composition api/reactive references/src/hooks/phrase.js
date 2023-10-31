import { ref, watchEffect, watch } from 'vue'

export const usePhrase = () => {
    const phrase = ref('')
    const reversedPhrase = ref('')
    const num = ref('')

    /**
     * watchEffect doesnt provide the new and old value
     */
    watchEffect(() => {
        reversedPhrase.value = phrase.value.split('').reverse().join('')
    })

    /**
     * first argument is what to watch.
     * If you want to watch more than one dependency you can change the first argument to an array
     * e.g. watch([phrase, num], ([newVal1, newValue2], [oldVal1, oldValue2]) => {})
     * newVal1 and oldval1 would be for phrase and newValue2 and oldValue2 would be for num
     */
    // watch(phrase, (newVal, oldVal) => {
    //   console.log({ newVal, oldVal })
    //   reversedPhrase.value = phrase.value.split('').reverse().join('')
    // })
    // watch([phrase, num], ([newVal, newValue2], [oldVal, oldValue2]) => {
    //   reversedPhrase.value = phrase.value.split('').reverse().join('')
    // })

    return {
        phrase,
        reversedPhrase,
        num
    }
}