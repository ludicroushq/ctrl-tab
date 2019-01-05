<template>
  <div class="message-body">
    <div class="message-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message-Body',
};
</script>

<style lang="scss" scoped>
.message-body {
  visibility: hidden;
  transition: visibility 0s 5s;
}

.message-content,
.message-body:hover,
.message-body:focus {
  visibility: visible;
  transition: visibility 0.2s;
}
</style>
