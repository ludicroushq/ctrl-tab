<template>
  <section class="home">
    <div class="columns">
      <div class="column" v-for="provider in this.providers" :key="provider.title">
        <Column :title="provider.title" :data="provider.data" :color="provider.color" />
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import Column from '@/components/Column.vue';

const timeAgo = time => moment.unix(time).fromNow();

const providers = {
  hackerNews: {
    title: 'Hacker News',
    color: '#ff9800',
    data: async () => {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const data = await response.json();
      const ids = data.splice(0, 25);
      const articles = await Promise.all(ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())));
      return articles.map((articleInput) => {
        const article = articleInput;
        article.subtitle = `${article.score.toLocaleString()} points by <a href="https://news.ycombinator.com/user?id=${article.by}" class="hide-underline" target="_blank" rel="noopener noreferrer">${article.by}</a>, ${timeAgo(article.time)}. <a href="https://news.ycombinator.com/item?id=${article.id}" target="_blank" rel="noopener noreferrer">${article.descendants} comments.</a>`;
        return article;
      });
    },
    selected: true,
  },
  reddit: {
    title: 'Reddit (/r/all)',
    color: '#2196f3',
    data: async () => {
      const response = await fetch('https://www.reddit.com/r/all.json');
      const data = await response.json();
      const posts = data.data.children;
      return posts.map((post) => {
        const article = post.data;
        article.subtitle = `${article.score.toLocaleString()} points by <a href="https://www.reddit.com/u/${article.author}" class="hide-underline" target="_blank" rel="noopener noreferrer">${article.author}</a>, ${timeAgo(article.created_utc)}. <a href="https://www.reddit.com${article.permalink}" target="_blank" rel="noopener noreferrer">${article.num_comments} comments.</a>`;
        return article;
      });
    },
    selected: true,
  },
  github: {
    title: 'Github',
    data: () => [],
    selected: true,
  },
  productHunt: {
    title: 'ProductHunt',
    data: () => [],
    selected: true,
  },
};

export default {
  name: 'Home',
  components: {
    Column,
  },
  data() {
    return {
      providers: [providers.reddit, providers.productHunt, providers.hackerNews, providers.github],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1em;
}
</style>
