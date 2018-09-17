<template>
  <div class="message-header" :style="`background: ${background};`">
    <slot></slot>
    <div class="is-pulled-right">
      <div v-if="edit">
        <a class="button is-small is-primary move" :style="`background-color: ${background};`">
          <span class="icon">
            <i class="material-icons">open_with</i>
          </span>
        </a>
        <a class="button is-small is-primary" @click="remove(name)" :style="`background-color: ${background};`">
          <span class="icon">
            <i class="material-icons">delete</i>
          </span>
        </a>
      </div>
      <div v-else-if="isLoading" class="is-loading"></div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Message-Header',
  props: ['background', 'isLoading', 'edit', 'remove', 'name'],
  components: {
    Spinner,
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: 0px;
  color: #ffffff;
  padding-left: 1em;
  padding-right: 1em;
}

.move {
  cursor: grab;
}
</style>
