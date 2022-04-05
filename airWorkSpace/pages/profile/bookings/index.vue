<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="$auth.$state.user.bookings.filter(e => e.status !== 'cancelled').length === 0">
        <v-card-text>You don't have any booking yet.</v-card-text>
      </v-card>
      <v-card
        v-for="(booking, idx) in $auth.$state.user.bookings.filter(e => e.status !== 'cancelled')"
        :key="idx"
        class="mx-auto my-2"
        max-width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div :class="`text-overline mb-4 ${statusColor(booking.status)}--text`">
              {{ capitalize(booking.status) }}
            </div>
            <v-list-item-title class="text-h7 mb-1 text-wrap">
              {{ booking.center.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ getType(booking.type) }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="booking.status === 'confirmed'">
              Termina en: {{ formatDate(booking.toTime) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="booking.status === 'open'">
              Pendiente hasta: {{ formatDate(booking.fromTime) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              Finalizado desde: {{ formatDate(booking.toTime) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            color="grey"
          >
            <v-img :src="booking.center.photos[0]" />
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-spacer />
          <v-btn :to="`/profile/bookings/manage/?id=${booking._id}`">
            Manage Booking
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'BookingsPage',
  middleware: 'auth',
  methods: {
    getType (type) {
      return utils.getType(type)
    },
    capitalize (str) {
      return utils.capitalize(str)
    },
    statusColor (status) {
      switch (status) {
        case 'open':
          return 'warning'
        case 'confirmed':
          return 'success'
        case 'closed':
          return 'error'
      }
    },
    formatDate (date) {
      return utils.formatDate(date)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
