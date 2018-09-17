<template>
  <div>
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

.add {
  height: 2.5em;
  width: 2.5em;
  bottom: 4.25em;
  right: 1.25em;
}
</style>
