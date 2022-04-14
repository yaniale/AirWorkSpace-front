<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card-title class="font-weight-bold mx-5 headline">
        Bookings
      </v-card-title>
      <v-card v-if="$auth.$state.user.bookings.filter(e => e.status !== 'cancelled').length === 0">
        <v-card-text>You don't have any booking yet.</v-card-text>
      </v-card>

      <v-col v-if="$vuetify.breakpoint.smAndDown">
        <v-card
          v-for="(booking, idx) in $auth.$state.user.bookings.filter(e => e.status !== 'cancelled')"
          :key="idx"
          class="mx-auto my-2 rounded-xl"
          width="90%"
          outlined
          elevation="2"
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
              size="100"
              color="grey"
              class="rounded-xl"
            >
              <v-img :src="booking.center.photos[0]" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-spacer />
            <v-btn v-if="booking.status === 'rejected' ? false : true" class="mr-2" :to="`/profile/bookings/manage/?id=${booking._id}`" color="primary">
              Manage Booking
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
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
