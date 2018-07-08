<template>
  <Message>
    <Message-Header background="#ff6600">
      Hacker News
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.articles" :isLoading="this.isLoading">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.score }} points by
          <a :href="`https://news.ycombinator.com/user?id=${article.item.author}`" class="hide-underline" target="_blank" rel="noopener noreferrer">{{ article.item.author }}</a>,
          {{ timeAgo(article.item.time) }}. <a href="`https://news.ycombinator.com/item?id=${article.item.id}`" target="_blank" rel="noopener noreferrer">{{ article.item.comments }} comments.</a>
        </div>
      </Message-Item>
    </Message-Body>
  </Message>
</template>

<script>
import timeAgo from '@/utils/timeAgo';

import Message from '@/components/message/Message.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import MessageBody from '@/components/message/MessageBody.vue';
import MessageItem from '@/components/message/MessageItem.vue';

export default {
  name: 'HackerNews',
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
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const data = await response.json();
      const ids = data.splice(0, 25);
      const articles = await Promise.all(ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())));
      return articles.map(article => ({
        title: article.title,
        url: article.url,
        score: article.score.toLocaleString(),
        author: article.by,
        time: article.time,
        id: article.id,
        comments: article.descendants,
      }));
    },
  },
  mounted() {
    this.request().then((data) => {
      this.articles = data;
      this.isLoading = false;
    });
  },
};
</script>
