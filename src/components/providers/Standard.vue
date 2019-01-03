<template>
  <Message>
    <Message-Header :background="this.data.background" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name" :refresh="this.refresh">
      <a :href="this.data.url" class="hide-underline" target="_blank" rel="noopener noreferrer">
        {{ this.data.title }}
      </a>
    </Message-Header>
    <Message-Body v-if="this.error">
      <div class="has-text-centered content">
        <br>
        <div class="item">
          <div class="title is-6">
            {{this.error}}
          </div>
        </div>
      </div>
    </Message-Body>
    <Message-Body v-else>
      <Message-Item :data="this.posts" :isLoading="this.isLoading" :moreURL="this.data.url">
        <div class="subtitle is-7" slot-scope="post" v-html="post.item.subtitle"></div>
        <template slot="attribution" v-if="this.data.attribution">
          <div class="item">
            <div class="subtitle is-7 has-text-centered" v-html="this.data.attribution">
            </div>
          </div>
          <hr>
        </template>
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
  name: 'Standard',
  props: ['data', 'edit', 'remove', 'name'],
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
      isFetching: true,
      error: '',
    };
  },
  methods: {
    async request() {
      const response = await fetch(`https://api.ctrltab.io/v1/${this.data.slug}/index`);
      this.isFetching = false;
      if (!response.ok && response.status >= 500) {
        throw new Error('there was a problem fetching the latest posts, we are working on getting it fixed');
      }
      const data = await response.json();
      if (response.status >= 300) {
        throw new Error(data.message);
      }
      if (data.articles) {
        return data.articles;
      }
      return data.posts;
    },
    async handler() {
      let data;
      this.error = '';
      try {
        data = await this.request();
        this.posts = data;
        storeData(this.data.slug, {
          data,
          createdAt: Date.now(),
        });
      } catch (err) {
        this.error = err.message;
      }
      this.isLoading = false;
    },
    async refresh() {
      this.isFetching = true;
      await this.handler();
    },
  },
  created() {
    const storage = getData(this.data.slug);
    if (storage) {
      this.posts = storage.data;
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
