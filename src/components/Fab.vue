<template>
  <div>
    <div class="edit-tooltip" v-if="this.edit">
      Press the X to Close Edit Mode
    </div>
    <a href="https://github.com/ludicrousxyz/tab" target="_blank" rel="noopener noreferrer">
      <button v-if="this.edit" class="button help is-medium is-black is-rounded">
        ?
      </button>
    </a>
    <button v-if="this.edit" @click="this.add" class="button add is-medium is-danger is-rounded">
      <span class="icon">
        <i class="material-icons">add</i>
      </span>
    </button>
    <button @click="toggleEdit" class="button edit is-medium is-primary is-rounded">
      <span class="icon">
        <i v-if="edit" class="material-icons">close</i>
        <i v-else class="material-icons">edit</i>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Fab',
  props: ['edit', 'toggleEdit', 'add'],
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 9999px;
  height: 3em;
  width: 3em;
  padding: 0;
  z-index: 30;
  position: fixed;
}

.edit {
  bottom: 1em;
  right: 1em;
}

.edit-tooltip {
  z-index: 30;
  width: 6em;
  text-align: center;
  position: fixed;
  right: 1.33em;
  font-size: 0.75em;
  background-color: rgba(255, 152, 0, 0.9);
  color: #ffffff;
  border-radius: 5px;
  bottom: 16.66em;
  padding: 1px;
}

.add {
  height: 2.5em;
  width: 2.5em;
  bottom: 4.25em;
  right: 1.25em;
}

.help {
  height: 2.5em;
  width: 2.5em;
  bottom: 7em;
  right: 1.25em;
  color: white;
}
</style>
