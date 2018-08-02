<template>
  <button :class="{
    button: true,
    'is-loading': true,
    'spinner': true,
    'is-large': !(isSmall),
  }">Loading</button>
</template>

<script>
export default {
  props: ['isSmall'],
};
</script>


<style lang="scss" scoped>
.spinner {
  border: 0px;
  background: rgba(0, 0, 0, 0);
}

button.is-loading.spinner::after {
  animation: spinAround 500ms infinite linear;
  border: 2px solid #3f51b5;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}
</style>
