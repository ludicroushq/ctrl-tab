<template>
  <Message>
    <Message-Header background="#24292e" :isLoading="this.isFetching">
      Github (Trending)
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.repos" :isLoading="this.isLoading">
        <div class="subtitle is-7" slot-scope="repo">
          {{ repo.item.description }}<br style="line-height: 125%;">
          {{ repo.item.stars.toLocaleString() }} stars,
          {{ repo.item.forks.toLocaleString() }} forks<span v-if="repo.item.language">, Language:
          {{ repo.item.language }}</span>
        </div>
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
      isFetching: true,
    };
  },
  methods: {
    async request() {
      const response = await fetch('https://tab.api.ludicrous.xyz/v1/github/index');
      const data = await response.json();
      this.isFetching = false;
      return data.repos;
    },
    async handler() {
      const data = await this.request();
      this.repos = data;
      this.isLoading = false;
      storeData('github', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('github');
    if (storage) {
      this.repos = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
