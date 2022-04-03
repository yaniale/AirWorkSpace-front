<template>
  <v-form>
    <v-text-field
      v-model="query"
      label="search"
      rounded
      dense
      filled
      @keydown.enter.prevent="searchCenter"
    />
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      data: ''
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

</style>
