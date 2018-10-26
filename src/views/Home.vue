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
          <table class="table is-fullwidth is-striped is-bordered">
            <tbody>
              <tr v-for="provider in this.allProviders" :key="provider.component">
                <td>
                  {{ provider.name }}
                  <div class="is-pulled-right">
                    <a @click="remove(provider.component)" v-if="isAdded(provider.component)" class="button is-danger is-small">Remove</a>
                    <a @click="add(provider.component)" v-else class="button is-success is-small">Add</a>&nbsp;&nbsp;
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
        v-for="provider in this.providers"
        :key="provider.title"
      >
        <component :is="provider.component" :edit="edit" :remove="remove"></component>
      </div>
    </draggable>
  </section>
</template>

<script>
import draggable from 'vuedraggable';

import { getData, storeData } from '@/utils/local-storage';
import Fab from '@/components/Fab.vue';
import HackerNews from '@/components/providers/HackerNews.vue';
import ProductHunt from '@/components/providers/ProductHunt.vue';
import Github from '@/components/providers/Github.vue';
import Reddit from '@/components/providers/Reddit.vue';
import NewYorkTimes from '@/components/providers/NewYorkTimes.vue';
import Slickdeals from '@/components/providers/Slickdeals.vue';

import ArsTechnica from '@/components/providers/ArsTechnica.vue';
import ABCNews from '@/components/providers/ABCNews.vue';
import BBCNews from '@/components/providers/BBCNews.vue';
import Bloomberg from '@/components/providers/Bloomberg.vue';
import CCN from '@/components/providers/CCN.vue';
import CNN from '@/components/providers/CNN.vue';
import ESPN from '@/components/providers/ESPN.vue';
import ESPNCricInfo from '@/components/providers/ESPNCricInfo.vue';
import FoxNews from '@/components/providers/FoxNews.vue';
import GoogleNews from '@/components/providers/GoogleNews.vue';
import Mashable from '@/components/providers/Mashable.vue';
import TechCrunch from '@/components/providers/TechCrunch.vue';
import TheVerge from '@/components/providers/TheVerge.vue';
import Wired from '@/components/providers/Wired.vue';
import TheTimesOfIndia from '@/components/providers/TheTimesOfIndia.vue';
import MedicalNewsToday from '@/components/providers/MedicalNewsToday.vue';

import Todoist from '@/components/providers/Todoist.vue';

import providersList from '@/../public/providers.json';

const allProviders = providersList.providers;

export default {
  name: 'Home',
  props: ['query'],
  components: {
    HackerNews,
    ProductHunt,
    Github,
    Reddit,
    NewYorkTimes,
    Slickdeals,

    ArsTechnica,
    ABCNews,
    BBCNews,
    Bloomberg,
    CCN,
    CNN,
    ESPN,
    ESPNCricInfo,
    FoxNews,
    GoogleNews,
    Mashable,
    TechCrunch,
    TheVerge,
    Wired,
    TheTimesOfIndia,
    MedicalNewsToday,

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

    add(component) {
      const provider = this.allProviders.find(obj => obj.component === component);
      this.providers.push(provider);
      storeData('providers', this.providers);
    },

    remove(component) {
      this.providers = this.providers.filter(obj => obj.component !== component);
      storeData('providers', this.providers);
    },

    isAdded(component) {
      return this.providers.find(obj => obj.component === component);
    },

    toggleEdit() {
      this.edit = !this.edit;
    },
  },

  data() {
    let providers = getData('providers');
    if (!providers) {
      providers = [];
      storeData('providers', providers);
    }
    return {
      allProviders,
      providers,
      addModal: false,
      edit: !providers.length,
    };
  },
};
</script>
