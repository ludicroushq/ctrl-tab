<template>
  <Message>
    <Message-Header background="#da552f">
      Product Hunt
    </Message-Header>
    <Message-Body>
      <Message-Item v-if="posts" :data="this.posts" :isLoading="this.isLoading">
        <div class="subtitle is-7" slot-scope="post">
          {{ post.item.description }}<br style="line-height: 125%;">
          {{ post.item.votes.toLocaleString()}} votes by
          <a :href="`https://www.producthunt.com/@${post.item.author}`" class="hide-underline" target="_blank" rel="noopener noreferrer">@{{ post.item.author }}</a>,
          {{ timeAgo(post.item.created, { unix: false }) }}.
          <a :href="post.item.commentsURL" target="_blank" rel="noopener noreferrer">View comments.</a>
        </div>
      </Message-Item>
      <div v-else class="has-text-centered has-text-black">
        <br>Coming Soon
      </div>
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
  name: 'ProductHunt',
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      posts: [],
      isLoading: true,
    };
  },
  methods: {
    async request() {
      const response = await fetch('https://api.ludicrous.xyz/v1/tab/product-hunt/index');
      const data = await response.json();
      return data.posts;
    },
    timeAgo,
  },
  mounted() {
    this.request().then((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  },
};
</script>
