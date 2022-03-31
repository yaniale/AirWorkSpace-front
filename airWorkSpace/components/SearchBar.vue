<template>
  <v-form>
    <v-text-field
      v-model="query"
      label="search"
      rounded
      dense
      filled
    />
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
