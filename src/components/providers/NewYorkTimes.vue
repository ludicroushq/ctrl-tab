<template>
  <Message>
    <Message-Header background="#000000" :isLoading="this.isFetching">
      New York Times
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.description }}<br style="line-height: 125%;">
          <span class="is-capitalized">{{ article.item.author }}</span>
          in {{ article.item.category }},
          {{ timeAgo(article.item.published) }}.
        </div>
      </Message-Item>
      <div class="item">
        <div class="has-text-centered subtitle is-6">
          <a
            href="https://www.reddit.com/r/all"
            class="hide-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More...
          </a>
        </div>
      </div>
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
  name: 'NewYorkTimes',
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
    timeAgo,
    async request() {
      const response = await fetch('https://tab.api.ludicrous.xyz/v1/new-york-times/index');
      const data = await response.json();
      this.isFetching = false;
      return data.articles;
    },
    async handler() {
      const data = await this.request();
      this.articles = data;
      this.isLoading = false;
      storeData('new-york-times', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('new-york-times');
    if (storage) {
      this.articles = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
