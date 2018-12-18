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
          <h1 class="title">Hello World!</h1>
          <h2 class="subtitle">To get started, click the + sign in the bottom right.</h2>
          <h2 class="subtitle is-7">Please Note: Ludicrous Tab is currently in BETA. Please report any issues you find on <a href="https://github.com/ludicrousxyz/tab" target="_blank" rel="noopener noreferrer">GitHub</a>.</h2>
        </div>
      </div>
    </div>
    <draggable v-else class="columns" :list="this.providers" @end="onEnd">
      <div
        class="column"
        v-for="provider in this.computedProviders"
        :key="provider.key"
      >
        <component :is="provider.component" :name="provider.key" :data="provider.data" :edit="edit" :remove="remove"></component>
      </div>
    </draggable>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import _ from 'lodash';

import { getData, storeData } from '@/utils/local-storage';
import Fab from '@/components/Fab.vue';
import Standard from '@/components/providers/Standard.vue';
import Todoist from '@/components/providers/Todoist.vue';

import providersList from '@/../public/providers.json';

const allProviders = providersList.providers;

export default {
  name: 'Home',
  props: ['query'],
  components: {
    Standard,
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

    add(key) {
      this.providers.push(key);
      storeData('providers', this.providers);
    },

    remove(key) {
      this.providers = this.providers.filter(obj => obj !== key);
      storeData('providers', this.providers);
    },

    isAdded(key) {
      return this.providers.find(obj => obj === key);
    },

    toggleEdit() {
      this.edit = !this.edit;
    },

    getProviders(providers) {
      return providers.map(key => allProviders.find(obj => obj.key === key));
    },
  },

  watch: {
    providers() {
      this.computedProviders = this.getProviders(this.providers);
    },
  },

  data() {
    let providers = getData('providers');
    if (!providers || typeof providers[0] === 'object') {
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
      computedProviders,
      addModal: false,
      edit: !providers.length,
    };
  },
};
</script>

<style lang="scss" scoped>
.provider {
  justify-content: space-between;
}
</style>
