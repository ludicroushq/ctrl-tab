<template>
  <div>
    <div v-if="isLoading" class="has-text-centered">
      <Spinner />
    </div>
    <div v-else>
      <div v-for="item in this.data" :key="item.id">
        <div class="item">
          <slot name="title" :item="item">
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
          </slot>
          <slot :item="item"></slot>
        </div>
        <hr>
      </div>
      <slot name="attribution"></slot>
      <div class="item" v-if="this.moreURL">
        <div class="has-text-centered subtitle is-6">
          <a
            :href="this.moreURL"
            class="hide-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More...
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Message-Item',
  props: ['data', 'isLoading', 'title', 'moreURL'],
  components: {
    Spinner,
  },
};
</script>
