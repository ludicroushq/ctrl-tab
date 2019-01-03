<template>
  <div>
    <div :class="{ modal: true, 'is-active': this.modal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ this.data.title }} Settings</p>
          <button class="delete" aria-label="close" @click="closeSettings"></button>
        </header>
        <section class="modal-card-body">
          <div class="field" v-for="attribute in Object.keys(this.attributes)" :key="attribute">
            <label class="label">{{ attribute }}</label>
            <div class="control">
              <input class="input" type="text" :placeholder="attribute" v-model="settings[attribute]">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveAndCloseSettings">Save</button>
        </footer>
      </div>
    </div>
    <Message>
      <Message-Header :background="this.data.background" :isLoading="this.isFetching" :settings="this.showSettings" :edit="this.edit" :remove="remove" :name="this.key" :refresh="this.refresh">
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
  </div>
</template>

<script>
import { getData, storeData } from '@/utils/local-storage';

import Message from '@/components/message/Message.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import MessageBody from '@/components/message/MessageBody.vue';
import MessageItem from '@/components/message/MessageItem.vue';

export default {
  name: 'StandardV2',
  props: ['data', 'edit', 'remove', 'name', 'id', 'attributes'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      posts: [],
      settings: {},
      isLoading: true,
      modal: false,
      isFetching: true,
      key: '',
      error: '',
    };
  },
  methods: {
    closeSettings() {
      this.modal = false;
    },
    showSettings() {
      this.modal = true;
    },
    saveAndCloseSettings() {
      this.modal = false;
      this.isLoading = true;
      storeData(this.key, {
        settings: this.settings,
        data: this.posts,
        createdAt: Date.now(),
      });
      this.refresh();
    },
    async request() {
      const params = new URLSearchParams();
      Object.keys(this.settings).forEach(key => params.set(key, this.settings[key]));
      let url = `https://api.ctrltab.io/v2/${this.data.slug}`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await fetch(url);
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
        storeData(this.key, {
          settings: this.settings,
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
    let name = this.data.slug;
    if (this.id) {
      name += `/${this.id}`;
    }
    this.key = name;
    const storage = getData(this.key);
    if (storage) {
      this.posts = storage.data;
      this.settings = storage.settings || {};
      this.isLoading = false;
    }
    this.handler();
  },
};
</script>
