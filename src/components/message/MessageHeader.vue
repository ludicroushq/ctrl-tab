<template>
  <div class="message-header" :style="`background: ${this.background};`">
    <slot></slot>
    <div class="is-pulled-right">
      <div v-if="this.edit">
        <a class="button is-small is-primary" @click="settings()" :style="`background-color: ${this.background};`" v-if="this.settings">
          <span class="icon">
            <i class="material-icons">settings</i>
          </span>
        </a>
        <a class="button is-small is-primary move" :style="`background-color: ${this.background};`">
          <span class="icon">
            <i class="material-icons">open_with</i>
          </span>
        </a>
        <a class="button is-small is-primary" @click="remove(name)" :style="`background-color: ${this.background};`">
          <span class="icon">
            <i class="material-icons">delete</i>
          </span>
        </a>
      </div>
      <div class="loading" v-else-if="this.isLoading">
        <div class="is-loading"></div>
      </div>
      <div v-else>
        <a v-if="this.refresh" class="button is-small is-primary" @click="refresh(name)" :style="`background-color: ${this.background};`">
          <span class="icon">
            <i class="material-icons" aria-hidden="true">refresh</i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Message-Header',
  props: ['background', 'isLoading', 'edit', 'remove', 'name', 'refresh', 'settings'],
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

.loading {
  padding: 3.5px 5px;
}

.move {
  cursor: grab;
}
</style>
