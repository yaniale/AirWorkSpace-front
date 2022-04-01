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
import Api from '@/services/search.service.js'

export default {
  data () {
    return {
      query: '',
      data: ''
    }
  },
  methods: {
    async searchCenter () {
      this.data = await Api.search(this.query)
      this.$store.commit('addCenters', this.data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
