<template>
  <v-row>
    <v-col>
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
