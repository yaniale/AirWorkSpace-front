<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="$auth.$state.user.bookings.length === 0">
        <v-card-text>You don't have any booking yet.</v-card-text>
      </v-card>
      <v-card v-for="(booking, idx) in $auth.$state.user.bookings" v-else :key="idx">
        <v-card-title>{{ booking.center.name }}</v-card-title>
        <v-card-subtitle>{{ }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import utils from '../services/utils.services'
export default {
  name: 'BookingsPage',
  middleware: 'auth',
  data () {
    return {
      bookings: []
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
