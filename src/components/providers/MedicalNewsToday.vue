<template>
  <Message>
    <Message-Header background="#05a2d3" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name">
      MedicalNewsToday
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading" moreURL="https://www.medicalnewstoday.com/">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.description }}<br style="line-height: 125%;">
          <span v-if="article.item.author">By {{ article.item.author }},</span>
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
  name: 'MedicalNewsToday',
  props: ['edit', 'remove'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      name: 'MedicalNewsToday',
      articles: [],
      isLoading: true,
      isFetching: true,
    };
  },
  methods: {
    timeAgo,
    async request() {
      const response = await fetch('https://api.tab.ludicrous.xyz/v1/medical-news-today/index');
      const data = await response.json();
      this.isFetching = false;
      return data.articles;
    },
    async handler() {
      const data = await this.request();
      this.articles = data;
      this.isLoading = false;
      storeData('medical-news-today', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('medical-news-today');
    if (storage) {
      this.articles = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
