<template>
  <Message>
    <Message-Header background="#0072bc" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name">
      Slickdeals Popular
    </Message-Header>
    <Message-Body>
      <Message-Item :data="this.deals" :isLoading="this.isLoading" moreURL="https://slickdeals.net">
        <div class="subtitle is-7" slot-scope="article">
          {{ article.item.description }}<br style="line-height: 125%;">
          in {{ article.item.category }},
          {{ timeAgo(article.item.published) }}.
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
  name: 'Slickdeals',
  props: ['edit', 'remove'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      name: 'Slickdeals',
      deals: [],
      isLoading: true,
      isFetching: true,
    };
  },
  methods: {
    timeAgo,
    async request() {
      const response = await fetch('https://tab.api.ludicrous.xyz/v1/slickdeals/index');
      const data = await response.json();
      this.isFetching = false;
      return data.deals;
    },
    async handler() {
      const data = await this.request();
      this.deals = data;
      this.isLoading = false;
      storeData('slickdeals', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('slickdeals');
    if (storage) {
      this.deals = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
