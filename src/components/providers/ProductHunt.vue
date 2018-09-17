<template>
  <Message>
    <Message-Header background="#da552f" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name">
      Product Hunt
    </Message-Header>
    <Message-Body>
      <div v-if="posts">
        <Message-Item :data="this.posts" :isLoading="this.isLoading" moreURL="https://www.producthunt.com">
          <div class="subtitle is-7" slot-scope="post">
            {{ post.item.description }}<br style="line-height: 125%;">
            {{ post.item.votes.toLocaleString()}} votes by
            <a :href="`https://www.producthunt.com/@${post.item.author}`" class="hide-underline" target="_blank" rel="noopener noreferrer">@{{ post.item.author }}</a>,
            {{ timeAgo(post.item.posted) }}.
            <a :href="post.item.commentsURL" target="_blank" rel="noopener noreferrer">
              View comments.
            </a>
          </div>
        </Message-Item>
      </div>
      <div v-else class="has-text-centered has-text-black">
        <br>Waiting for new posts...
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
  name: 'ProductHunt',
  props: ['edit', 'remove'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      name: 'ProductHunt',
      posts: [],
      isLoading: true,
      isFetching: true,
    };
  },
  methods: {
    timeAgo,
    async request() {
      const response = await fetch('https://tab.api.ludicrous.xyz/v1/product-hunt/index');
      const data = await response.json();
      this.isFetching = false;
      return data.posts;
    },
    async handler() {
      const data = await this.request();
      this.posts = data;
      this.isLoading = false;
      storeData('product-hunt', {
        data,
        createdAt: Date.now(),
      });
    },
  },
  created() {
    const storage = getData('product-hunt');
    if (storage) {
      this.posts = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
