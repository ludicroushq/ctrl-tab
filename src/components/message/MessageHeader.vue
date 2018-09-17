<template>
  <div class="message-header" :style="`background: ${background};`">
    <slot></slot>
    <div v-if="isLoading" class="is-pulled-right is-loading" style="padding-right: 1em;">
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Message-Header',
  props: ['background', 'isLoading'],
  components: {
    Spinner,
  },
};
</script>
