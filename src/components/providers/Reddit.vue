<template>
  <Message>
    <Message-Header background="#1976d2">
      Reddit (/r/all)
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.score.toLocaleString()}} points by
          <a :href="`https://www.reddit.com/u/${article.item.author}`" class="hide-underline" target="_blank" rel="noopener noreferrer">{{ article.item.author }}</a>
          on <a :href="`https://www.reddit.com${article.item.subreddit}`" class="hide-underline" target="_blank" rel="noopener noreferrer">{{ article.item.subreddit }}</a>,
          {{ timeAgo(article.item.created) }}.
          <a :href="`https://www.reddit.com${article.item.permalink}`" target="_blank" rel="noopener noreferrer">{{ article.item.comments.toLocaleString() }} comments.</a>
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
  name: 'Reddit',
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
    };
  },
  methods: {
    timeAgo,
    async request() {
      const response = await fetch('https://api.ludicrous.xyz/v1/tab/reddit/index');
      const data = await response.json();
      return data.posts;
    },
    async handler() {
      const data = await this.request();
      this.articles = data;
      this.isLoading = false;
      storeData('reddit', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('reddit');
    if (storage) {
      this.articles = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
