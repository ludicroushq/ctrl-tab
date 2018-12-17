<template>
  <Message>
    <Message-Header :background="this.data.background" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.data.title">
      {{ this.data.title }}
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading" :moreURL="this.data.url">
        <div class="subtitle is-7" slot-scope="post" v-html="post.item.subtitle"></div>
        <template slot="attribution" v-if="this.data.attribution">
          <div class="item">
            <div class="subtitle is-7 has-text-centered" v-html="this.data.attribution">
            </div>
          </div>
          <hr>
        </template>
      </Message-Item>
    </Message-Body>
  </Message>
</template>

<script>
import { getData, storeData } from '@/utils/local-storage';

import Message from '@/components/message/Message.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import MessageBody from '@/components/message/MessageBody.vue';
import MessageItem from '@/components/message/MessageItem.vue';

export default {
  name: 'Standard',
  props: ['data', 'edit', 'remove'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      articles: [],
      isLoading: true,
      isFetching: true,
    };
  },
  methods: {
    async request() {
      const response = await fetch(`https://api.tab.ludicrous.xyz/v1/${this.data.slug}/index`);
      const data = await response.json();
      this.isFetching = false;
      return data.articles;
    },
    async handler() {
      const data = await this.request();
      this.articles = data;
      this.isLoading = false;
      storeData(this.data.slug, {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData(this.data.slug);
    if (storage) {
      this.articles = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
