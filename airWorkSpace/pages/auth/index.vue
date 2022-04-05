<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <login-component />
    </v-col>
  </v-row>
</template>

<script>
import loginComponent from '@/components/loginComponent.vue'
export default {
  name: 'LoginPage',
  components: { loginComponent }

}
</script>

<style lang="scss" scoped>
</style>
