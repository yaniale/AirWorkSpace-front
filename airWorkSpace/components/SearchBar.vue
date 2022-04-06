<template>
  <v-form>
    <v-text-field
      v-model="query"
      placeholder="Search"
      type="search"
      :style="$vuetify.breakpoint.mdAndUp ? 'width:800px' : 'width:330px'"
      rounded
      filled
      dark
      dense
      hide-details
      append-icon="mdi-magnify"
      @keydown.enter.prevent="searchCenter"
    />
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      data: '',
      isFirstLoad: true
    }
  },
  methods: {
    async searchCenter () {
      this.data = await this.$axios.get(`/center?query=${this.query}`)
      this.$store.commit('addCenters', this.data.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.centered-input input {
  text-align: center
}
</style>
