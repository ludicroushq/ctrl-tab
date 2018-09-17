<template>
  <section class="home">
    <div :class="{ modal: true, 'is-active': settingsModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Settings</p>
          <button class="delete" aria-label="close" @click="closeSettingsModal"></button>
        </header>
        <section class="modal-card-body">
          <h1 class="title">Select Providers</h1>
          <h2 class="subtitle">Up to 4. Drag on the homepage to reorder them.</h2>
          <div class="subtitle is-marginless" v-if="this.providers.length >= 4">
            Unselect One to Continue
          </div>
          <div class="subtitle is-marginless" v-else-if="this.providers.length <= 3">
            Select One to Continue
          </div>
          <hr>
          <div class="field" v-for="provider in this.allProviders" :key="provider.component">
            <div class="control">
              <label class="checkbox">
                <input
                  type="checkbox"
                  @click="toggleProvider(provider.component)"
                  :disabled="isDisabled(provider.component)"
                  :checked="isChecked(provider.component)"
                >
                {{ provider.name }}
              </label>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="closeSettingsModal">Close</button>
        </footer>
      </div>
    </div>
    <fab
      icon-size="small"
      bg-color="#363636"
      z-index="30"
      main-tooltip="Drag the Panels to Reoder<br>Click to Configure"
      :actions="fabActions"
      @settings="openSettingsModal"
    ></fab>
    <draggable class="columns" :list="this.providers" @end="onEnd">
      <div
        class="column"
        v-for="provider in this.providers"
        :key="provider.title"
      >
        <component :is="provider.component"></component>
      </div>
    </draggable>
  </section>
</template>

<script>
import fab from 'vue-fab';
import draggable from 'vuedraggable';

import { getData, storeData } from '@/utils/local-storage';
import HackerNews from '@/components/providers/HackerNews.vue';
import ProductHunt from '@/components/providers/ProductHunt.vue';
import Github from '@/components/providers/Github.vue';
import Reddit from '@/components/providers/Reddit.vue';
import NewYorkTimes from '@/components/providers/NewYorkTimes.vue';
// import Todoist from '@/components/providers/Todoist.vue';

const allProviders = [
  {
    name: 'Reddit',
    component: 'Reddit',
    default: true,
  },
  {
    name: 'Product Hunt',
    component: 'ProductHunt',
    default: true,
  },
  {
    name: 'Hacker News',
    component: 'HackerNews',
    default: true,
  },
  {
    name: 'Github',
    component: 'Github',
  },
  {
    name: 'New York Times',
    component: 'NewYorkTimes',
    default: true,
  },
  // {
  //   name: 'Todoist',
  //   component: 'Todoist',
  //   selected: true,
  // },
];

export default {
  name: 'Home',
  props: ['query'],
  components: {
    HackerNews,
    ProductHunt,
    Github,
    Reddit,
    NewYorkTimes,
    // Todoist,
    fab,
    draggable,
  },

  methods: {
    openSettingsModal() {
      this.settingsModal = true;
    },

    closeSettingsModal() {
      this.settingsModal = false;
    },

    onEnd() {
      storeData('providers', this.providers);
    },

    toggleProvider(component) {
      const provider = this.providers.find(obj => obj.component === component);
      if (!provider) {
        this.providers.push(this.allProviders.find(obj => obj.component === component));
        return storeData('providers', this.providers);
      }
      this.providers = this.providers.filter(obj => obj.component !== component);
      return storeData('providers', this.providers);
    },

    isChecked(component) {
      return this.providers.find(obj => obj.component === component);
    },

    isDisabled(component) {
      return (!this.isChecked(component) && this.providers.length >= 4) ||
        (this.isChecked(component) && this.providers.length <= 3);
    },
  },

  data() {
    let providers = getData('providers');
    if (!providers) {
      providers = allProviders.filter(provider => provider.default);
      storeData('providers', providers);
    }
    return {
      allProviders,
      providers,
      settingsModal: false,
      fabActions: [
        {
          name: 'settings',
          icon: 'settings',
          color: '#3f51b5',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.fab-wrapper {
  right: 1vw !important;
  bottom: 1vh !important;
}
</style>
