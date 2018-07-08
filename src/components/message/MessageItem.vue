<template>
  <div>
    <div v-if="isLoading" class="has-text-centered">
      <button class="button is-loading spinner is-large">Loading</button>
    </div>
    <div v-else v-for="item in this.data" :key="item.id">
      <div class="item">
        <div class="title is-6">
          <a
            :href="item.url"
            class="hide-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.title }}
          </a>
        </div>
        <slot :item="item"></slot>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message-Item',
  props: ['data', 'isLoading'],
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
