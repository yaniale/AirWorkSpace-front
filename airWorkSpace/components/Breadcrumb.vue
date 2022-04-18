<template>
  <v-breadcrumbs id="bread-crumb" :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    items: Array
  }
}
</script>

<style lang="scss" scoped>
#bread-crumb {
  width: 100%;
}
</style>
