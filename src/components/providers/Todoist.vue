<template>
  <Message>
    <Message-Header background="#db4c3f" :isLoading="this.isFetching" :edit="this.edit" :remove="remove" :name="this.name" :refresh="this.authenticated && this.refresh">
      <a href="https://todoist.com/app" class="hide-underline" target="_blank" rel="noopener noreferrer">
        Todoist BETA
      </a>
    </Message-Header>
    <Message-Body v-if="this.$browser === 'Chrome'">
      <div class="has-text-centered content" v-if="!this.authenticated && !this.isLoading">
        <br>
        <a class="button is-success" @click="login">Log in with Todoist</a>
        <p class="has-text-danger subtitle" v-if="this.oauthError">
          <br>
          {{ this.oauthError }}
        </p>
      </div>
      <Message-Item v-else-if="(this.tasks && this.tasks.length > 0) || this.isLoading" :isLoading="this.isLoading" :data="this.tasks">
        <template slot="title" slot-scope="task">
          <div class="title is-6">
            {{ task.item.title }}
          </div>
        </template>
        <div class="subtitle is-7" slot-scope="task">
          Due {{ calendar(task.item.due, { noTime: task.item.allDay }) }}
        </div>
      </Message-Item>
      <div class="has-text-centered content" v-else>
        <br>
        <div class="item">
          <div class="title is-6">
            Looks like you're all done! 🎉
          </div>
        </div>
      </div>
    </Message-Body>
    <Message-Body v-else>
      <div class="has-text-centered content">
        <br>
        <div class="item">
          <div class="title is-6">
            Todoist currently only works on Chrome. 😔
          </div>
        </div>
      </div>
    </Message-Body>
  </Message>
</template>

<script>
/* global chrome */
import { getData, storeData } from '@/utils/local-storage';
import { calendar } from '@/utils/time-ago';

import Message from '@/components/message/Message.vue';
import MessageHeader from '@/components/message/MessageHeader.vue';
import MessageBody from '@/components/message/MessageBody.vue';
import MessageItem from '@/components/message/MessageItem.vue';

import uuidv4 from 'uuid/v4';


const authenticate = (url, options = {}) => new Promise((resolve, reject) => {
  chrome.identity.launchWebAuthFlow({
    url: encodeURI(url),
    interactive: true,
  }, (returnURL) => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return reject(new Error('There was a problem trying to sign you in. Please try again later. If the issue persists, please contact the developer.'));
    }

    const codeUrl = new URL(returnURL);

    if (codeUrl.searchParams.get('error') === 'access_denied') {
      return reject(new Error('Whoops, looks like you hit "cancel". Please try again!'));
    }

    if (options.secret && codeUrl.searchParams.get('state') !== options.secret) {
      return reject(new Error('There was security error matching the secret keys. Please try again.'));
    }

    return resolve(codeUrl.searchParams.get('code'));
  });
});

export default {
  name: 'Todoist',
  props: ['edit', 'remove', 'name'],
  components: {
    Message,
    MessageHeader,
    MessageBody,
    MessageItem,
  },
  data() {
    return {
      oauthError: null,
      isLoading: true,
      isFetching: true,
      authenticated: true,
      token: '',
      tasks: [],
    };
  },
  methods: {
    calendar,
    async request() {
      const response = await fetch('https://api.tab.ludicrous.xyz/v1/todoist/index', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          token: this.token,
        }),
      });
      const data = await response.json();
      this.isFetching = false;
      return data.tasks;
    },
    async handler() {
      const data = await this.request();
      this.tasks = data;
      this.isLoading = false;
      storeData('todoist', {
        token: this.token,
        data,
        createdAt: Date.now(),
      });
    },
    async refresh() {
      this.isFetching = true;
      await this.handler();
    },
    async login() {
      this.isLoading = true;
      const scope = 'data:read_write';
      const clientID = 'a5a726755f4e4f33bf1876daaeef3d3e';
      const authenticateSecret = uuidv4();
      const authenticateURL = `https://todoist.com/oauth/authorize?client_id=${clientID}&scope=${scope}&state=${authenticateSecret}`;

      let code;
      try {
        code = await authenticate(authenticateURL, { secret: authenticateSecret });
      } catch (err) {
        this.oauthError = err.message;
        this.isLoading = false;
        return;
      }

      if (!code) {
        this.oauthError = 'There was an unknown error signing you in. Please try again later.';
        this.isLoading = false;
        return;
      }

      this.oauthError = null;

      const clientSecret = '1be07b96e0384e0d9df19e1ed416f253';
      const tokenURL = 'https://todoist.com/oauth/access_token';
      const tokenBody = {
        client_id: clientID,
        client_secret: clientSecret,
        code,
      };

      const tokenResponse = await fetch(tokenURL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(tokenBody),
      });
      const tokenJSON = await tokenResponse.json();
      const { access_token: token } = tokenJSON;

      this.authenticated = true;
      this.token = token;
      await this.handler();
    },
  },
  async created() {
    const storage = getData('todoist') || {};

    if (!storage.token) {
      this.authenticated = false;
      this.isLoading = false;
      this.isFetching = false;
      return;
    }

    this.tasks = storage.data;
    this.isLoading = false;
    this.oauthError = null;
    this.token = storage.token;
    if (!storage.data || new Date(storage.createdAt) < Date.now() - (1000 * 60 * 5)) {
      await this.handler();
    }
    this.isFetching = false;
  },
};
</script>
