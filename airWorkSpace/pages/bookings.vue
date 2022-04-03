<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="$auth.$state.user.bookings.length === 0">
        <v-card-text>You don't have any booking yet.</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BookingsPage',
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>

</style>
