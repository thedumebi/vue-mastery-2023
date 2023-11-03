<template>
  <input
    type="email"
    class="form-control"
    placeholder="E-mail"
    :value="email"
    @input="update($event)"
    :class="{
      'is-valid': validateEmail(email),
      'is-invalid': !validateEmail(email),
    }"
  />
  <!-- <input
    type="email"
    class="form-control"
    placeholder="E-mail"
    :value="modelValue"
    @input="update($event)"
    :class="{
      'is-valid': validateEmail(modelValue),
      'is-invalid': !validateEmail(modelValue),
    }"
  /> -->
</template>

<script>
import validateEmail from "../validate-email";
export default {
  name: "EmailInput",
  props: ["email", 'modelValue'],
  emits: ["update:email", 'update:modelValue'],
  methods: {
    update($event) {
    //   this.$emit('update:modelValue', $event.target.value);
      this.$emit("update:email", $event.target.value);
    },
    validateEmail,
  },
};
</script>

<style></style>
