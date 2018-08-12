<template>
  <Message>
    <Message-Header background="#db4c3f">
      Todoist (Today)
    </Message-Header>
    <Message-Body>
      <div class="has-text-centered content" v-if="!this.authenticated">
        <br>
        <a class="button is-success" @click="login">Log in with Todoist</a>
        <p class="has-text-danger subtitle" v-if="this.oauthError">
          <br>
          {{ this.oauthError }}
        </p>
      </div>
      <Message-Item
        :isLoading="this.isLoading"
        :data="this.tasks"
        v-else-if="this.tasks.length > 0"
      >
        <template slot="title" slot-scope="task">
          <div class="title is-6">
            <a
              :href="task.item.url"
              class="hide-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ task.item.title }}
            </a>
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
      authenticated: true,
      tasks: [],
    };
  },
  async created() {
    const storage = getData('todoist') || {};

    if (!storage.token) {
      this.authenticated = false;
      this.isLoading = false;
      return;
    }

    this.tasks = await this.handler(storage.token);
    this.oauthError = null;
    this.isLoading = false;
  },
  methods: {
    calendar,
    async handler(token) {
      const itemsResponse = await fetch('https://todoist.com/api/v7/sync', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          token,
          sync_token: '*',
          resource_types: ['items'],
        }),
      });

      const itemsJSON = await itemsResponse.json();

      const sortByDueDate = (item1, item2) => {
        if (new Date(item1.due_date_utc) > new Date(item2.due_date_utc)) {
          return 1;
        }
        if (new Date(item1.due_date_utc) < new Date(item2.due_date_utc)) {
          return -1;
        }
        return 0;
      };

      const filterTodayTasks = (item) => {
        const date = new Date(Date.now());
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0, 0);
        return item.due_date_utc && new Date(item.due_date_utc) < date;
      };

      const serializeTasks = (item) => {
        const due = new Date(item.due_date_utc);
        if (item.all_day) {
          due.setHours(0, 0, 0, 0);
        }
        return {
          title: item.content,
          due,
          allDay: item.all_day,
        };
      };

      return itemsJSON.items
        .filter(filterTodayTasks)
        .sort(sortByDueDate)
        .map(serializeTasks);
    },
    async login() {
      const scope = 'data:read_write';
      const clientID = 'a5a726755f4e4f33bf1876daaeef3d3e';
      const authenticateSecret = uuidv4();
      const authenticateURL = `https://todoist.com/oauth/authorize?client_id=${clientID}&scope=${scope}&state=${authenticateSecret}`;

      let code;
      try {
        code = await authenticate(authenticateURL, { secret: authenticateSecret });
      } catch (err) {
        this.oauthError = err.message;
        return;
      }

      if (!code) {
        this.oauthError = 'There was an unknown error signing you in. Please try again later.';
        return;
      }

      this.isLoading = true;
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

      this.tasks = await this.handler(token);
      this.isLoading = false;
      storeData('todoist', { token });
    },
  },
};
</script>
