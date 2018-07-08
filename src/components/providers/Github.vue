<template>
  <Message>
    <Message-Header background="#24292e">
      Github (Trending)
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.repos" :isLoading="this.isLoading">
        <div class="subtitle is-7" slot-scope="repo">
          {{ repo.item.description }}<br style="line-height: 125%;">
          {{ repo.item.stars }} stars,
          {{ repo.item.forks }} forks<span v-if="repo.item.language">, Language:
          {{ repo.item.language }}</span>
        </div>
      </Message-Item>
    </Message-Body>
  </Message>
</template>

<script>
import Message from '@/components/message/Message.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import MessageBody from '@/components/message/MessageBody.vue';
import MessageItem from '@/components/message/MessageItem.vue';

export default {
  name: 'Github',
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      repos: [],
      isLoading: true,
    };
  },
  methods: {
    async request() {
      const response = await fetch('https://github-trending-api.now.sh/repositories');
      const data = await response.json();
      return data.map(repo => ({
        title: repo.name,
        url: repo.url,
        description: repo.description,
        stars: repo.stars.toLocaleString(),
        forks: repo.forks.toLocaleString(),
        language: repo.language,
      }));
    },
  },
  mounted() {
    this.request().then((data) => {
      this.repos = data;
      this.isLoading = false;
    });
  },
};
</script>
