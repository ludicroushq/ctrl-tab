<template>
  <section class="home">
    <div :class="{ modal: true, 'is-active': addModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Providers</p>
          <button class="delete" aria-label="close" @click="hideAddModal"></button>
        </header>
        <section class="modal-card-body">
          <h1 class="title">Personalize Your New Tab Page</h1>
          <h2 class="subtitle">Show and hide data sources that matter to you. To edit their order, close this menu and drag and drop them.</h2>
          <div class="columns">
            <div class="column">
              <nav class="panel" v-for="category in this.leftCategories" :key="category.name">
                <p class="panel-heading">
                  {{ category.name }}
                </p>
                <div class="panel-block provider" v-for="provider in category.providers" :key="provider.key">
                  {{ provider.name }}
                  <div>
                    <a @click="remove(provider.key)" v-if="isAdded(provider.key)" class="button is-outlined is-danger is-small">Remove</a>
                    <a @click="add(provider.key)" v-else class="button is-outlined is-success is-small">Add</a>&nbsp;&nbsp;
                  </div>
                </div>
              </nav>
            </div>
            <div class="column">
              <nav class="panel" v-for="category in this.rightCategories" :key="category.name">
                <p class="panel-heading">
                  {{ category.name }}
                </p>
                <div class="panel-block provider" v-for="provider in category.providers" :key="provider.key">
                  {{ provider.name }}
                  <div>
                    <a @click="remove(provider.key)" v-if="isAdded(provider.key)" class="button is-outlined is-danger is-small">Remove</a>
                    <a @click="add(provider.key)" v-else class="button is-outlined is-success is-small">Add</a>&nbsp;&nbsp;
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <hr>
          <div class="content">
            <h2>Don't see what you are looking for?</h2>
            Most news websites also provide RSS feeds which we now support! Try Googling "INSERT_NEWS_WEBSITE rss feeds". If you find a working feed (it looks like a bunch of code), then just do the following:
            <ol>
              <li>Add a RSS component from above (in the "custom" category)</li>
              <li>Close this menu</li>
              <li>Press the settings button in the title</li>
              <li>Paste the link and press save</li>
              <li>Voilà!</li>
            </ol>
            If you still can't find what you are looking for, then open an issue <a href="https://github.com/ludicrousxyz/ctrl-tab/issues" target="_blank" rel="noopener noreferrer">here</a> and we will take a look.
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="hideAddModal">Close</button>
        </footer>
      </div>
    </div>
    <Fab :edit="this.edit" :toggleEdit="toggleEdit" :add="this.showAddModal" />
    <div v-if="!this.providers.length">
      <div class="columns is-vcentered" style="height: 96vh;">
        <div class="column has-text-centered">
          <h1 class="title">hello world!</h1>
          <h2 class="subtitle">to get started, click the + sign in the bottom right.</h2>
          <h2 class="subtitle is-7">please note: ctrl tab is currently in BETA. please report any issues you find on <a href="https://github.com/ludicrousxyz/ctrl-tab/issues" target="_blank" rel="noopener noreferrer">GitHub</a>.</h2>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="has-text-centered is-size-7" style="padding: 0.125rem; display: block;" v-html="this.message || '&nbsp;'"></div>
      <draggable class="columns" :list="this.providers" @end="onEnd">
        <div
          class="column"
          style="padding-top: 0px; margin-top: 0.75rem;"
          v-for="provider in this.computedProviders"
          :key="`${provider.key}${provider.id ? `-${provider.id}` : ''}`"
        >
          <component :is="provider.component" :attributes="provider.attributes" :name="provider.key" :id="provider.id" :data="provider.data" :edit="edit" :remove="remove"></component>
        </div>
      </draggable>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import _ from 'lodash';

import { getData, storeData, clearData } from '@/utils/local-storage';
import Fab from '@/components/Fab.vue';
import Standard from '@/components/providers/Standard.vue';
import StandardV2 from '@/components/providers/StandardV2.vue';
import Todoist from '@/components/providers/Todoist.vue';

import providersList from '@/../public/providers.json';

const allProviders = providersList.providers;

export default {
  name: 'Home',
  props: ['query'],
  components: {
    Standard,
    StandardV2,
    Todoist,

    Fab,
    draggable,
  },

  methods: {
    showAddModal() {
      this.addModal = true;
    },

    hideAddModal() {
      this.addModal = false;
    },

    onEnd() {
      storeData('providers', this.providers);
    },

    getNextId(key) {
      const providers = this.providers.filter(obj => (typeof obj === 'object' && obj.provider === key));
      let i = 1;
      let done = false;
      const findFunc = obj => obj.id === i;
      while (!done) {
        const found = providers.find(findFunc);
        if (found) {
          i += 1;
        } else {
          done = true;
        }
      }
      return i;
    },

    add(key) {
      const provider = allProviders.find(obj => obj.key === key);
      let newKey = key;
      if (provider.multi) {
        newKey = {
          id: this.getNextId(key),
          provider: key,
        };
      }
      this.providers.push(newKey);
      storeData('providers', this.providers);
    },

    remove(key) {
      this.providers = this.providers.filter((obj) => {
        if (key.includes('/') && typeof obj === 'object') {
          const split = key.split('/');
          return obj.provider !== split[0] || obj.id !== parseInt(split[1], 10);
        }
        return obj !== key;
      });
      clearData(key);
      storeData('providers', this.providers);
    },

    isAdded(key) {
      return this.providers.find(obj => obj === key);
    },

    toggleEdit() {
      this.edit = !this.edit;
    },

    getProviders(providers) {
      return providers.map((key) => {
        if (typeof key === 'object') {
          const provider = allProviders.find(obj => obj.key === key.provider);
          return Object.assign({}, provider, key);
        }
        return allProviders.find(obj => obj.key === key);
      });
    },
  },

  watch: {
    providers() {
      this.computedProviders = this.getProviders(this.providers);
    },
  },

  data() {
    let providers = getData('providers');
    if (!providers) {
      providers = [];
      storeData('providers', providers);
    }
    const computedProviders = this.getProviders(providers);

    const categories = _.uniq(allProviders.map(provider => provider.category || 'Uncategorized'));
    const categorizedProviders = categories.map(category => ({
      name: category,
      providers: allProviders.filter(provider => provider.category === category),
    }));
    const sortedCategories = _.sortBy(categorizedProviders, [obj => obj.providers.length]).reverse();
    const leftCategories = [];
    const rightCategories = [];
    sortedCategories.forEach((category) => {
      if (leftCategories.length > rightCategories.length) {
        return rightCategories.push(category);
      }
      return leftCategories.push(category);
    });
    leftCategories.reverse();
    rightCategories.reverse();

    return {
      leftCategories,
      rightCategories,
      providers,
      message: null,
      computedProviders,
      addModal: false,
      edit: !providers.length,
    };
  },

  async created() {
    let message;
    try {
      const req = await fetch('https://api.ctrltab.io');
      const res = await req.json();
      if (res) message = res.info;
    } catch (err) {
      // do nothing
    }
    this.message = message;
  },
};
</script>

<style lang="scss" scoped>
.provider {
  justify-content: space-between;
}
</style>
