<template>
  <div class="message-header" :style="`background: ${background};`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Message-Header',
  props: ['background'],
};
</script>
