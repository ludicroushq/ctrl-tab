<template>
  <Message>
    <Message-Header background="#ff6600" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name">
      Hacker News
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading" moreURL="https://news.ycombinator.com">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.score }} points by
          <a :href="`https://news.ycombinator.com/user?id=${article.item.author}`" class="hide-underline" target="_blank" rel="noopener noreferrer">{{ article.item.author }}</a>,
          {{ timeAgo(article.item.time) }}. <a :href="`https://news.ycombinator.com/item?id=${article.item.id}`" target="_blank" rel="noopener noreferrer" v-if="!isNaN(article.item.comments)">{{ article.item.comments.toLocaleString() }} comments.</a>
        </div>
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
  name: 'HackerNews',
  props: ['edit', 'remove'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      name: 'HackerNews',
      articles: [],
      isLoading: true,
      isFetching: true,
    };
  },
  methods: {
    timeAgo,
    async request() {
      const response = await fetch('https://api.tab.ludicrous.xyz/v1/hacker-news/index');
      const data = await response.json();
      this.isFetching = false;
      return data.posts;
    },
    async handler() {
      const data = await this.request();
      this.articles = data;
      this.isLoading = false;
      storeData('hacker-news', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('hacker-news');
    if (storage) {
      this.articles = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
