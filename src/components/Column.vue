<template>
  <article class="tile is-child message is-medium is-primary">
    <div class="message-header" :style="`background: ${color};`">
      <p>{{ title }}</p>
    </div>
    <div class="message-body">
      <div v-for="article in this.articles" :key="article.id">
        <div class="item">
          <div class="title is-6">
            <a
              :href="article.url"
              class="hide-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ article.title }}
            </a>
          </div>
          <div class="subtitle is-7" v-html="article.subtitle"></div>
        </div>
        <hr>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Column',
  props: ['title', 'color', 'data'],
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.data().then((data) => {
      this.articles = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.message-body {
  padding: 0em;
  height: 88vh;
  overflow: scroll;
}

.message {
  overflow: scroll;
}

.item {
  margin: 0.5em;
}

hr {
  margin: 0.25em;
}
</style>
