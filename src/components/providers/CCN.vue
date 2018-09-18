<template>
  <Message>
    <Message-Header background="#faa61a" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name">
      Crypto Coins News
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading" moreURL="https://www.ccn.com">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.description }}<br style="line-height: 125%;">
          {{ timeAgo(article.item.published) }}.
        </div>
        <template slot="attribution">
          <div class="item">
            <div class="subtitle is-7 has-text-centered">
              Feed Provided by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI.org</a>.
            </div>
          </div>
          <hr>
        </template>
      </Message-Item>
    </Message-Body>
  </Message>
</template>

<script>
import { timeAgo } from '@/utils/time-ago';
import { getData, storeData } from '@/utils/local-storage';

import Message from '@/components/message/Message.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import MessageBody from '@/components/message/MessageBody.vue';
import MessageItem from '@/components/message/MessageItem.vue';

export default {
  name: 'CCN',
  props: ['edit', 'remove'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      name: 'CCN',
      articles: [],
      isLoading: true,
      isFetching: true,
    };
  },
  methods: {
    timeAgo,
    async request() {
      const response = await fetch('https://api.tab.ludicrous.xyz/v1/ccn/index');
      const data = await response.json();
      this.isFetching = false;
      return data.articles;
    },
    async handler() {
      const data = await this.request();
      this.articles = data;
      this.isLoading = false;
      storeData('ccn', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('ccn');
    if (storage) {
      this.articles = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
