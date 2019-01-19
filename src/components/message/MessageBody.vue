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
}

.message-content,
.message-body:hover,
.message-body:focus {
  visibility: visible;
}
</style>
