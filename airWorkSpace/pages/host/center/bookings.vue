<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title>
          "{{ center.name }}" Bookings
        </v-card-title>
      </v-card>
      <v-card v-for="(booking, idx) in bookings" :key="idx" class="my-2">
        <v-list-item three-line>
          <v-list-item-content>
            <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
              {{ booking.status }}
            </div>
            <v-list-item-subtitle class="text-h7 mb-1 text-wrap">
              Customer: {{ booking.customerId.firstName }} {{ booking.customerId.lastName }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{ getType(booking.type) }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              Pending until: {{ formatDate(booking.fromTime) }}
            </v-list-item-subtitle>
            <v-divider />
            <v-spacer class="my-2" />
            <v-input hide-details>
              <v-list-item-subtitle>
                From: {{ formatDate(booking.fromTime) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                To: {{ formatDate(booking.toTime) }}
              </v-list-item-subtitle>
            </v-input>
            <v-spacer class="my-2" />
            <v-list-item-subtitle v-if="booking.status==='open'">
              Requested quantity: {{ booking.bookedQuantity }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-spacer />
          <v-btn class="red lighten-2" @click="rejectBooking">
            Reject
          </v-btn>
          <v-btn class="green lighten-2" @click="acceptBooking">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'HostBookingsPage',
  data () {
    return {
      center: {},
      bookings: []

    }
  },
  mounted () {
    this.getCenter()
  },
  methods: {
    getCenter () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
      this.bookings = this.center.bookings.filter(e => e.status === 'open')
    },
    getType (type) {
      return utils.getType(type)
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
    },
    rejectBooking (id) {
      console.log('cancelada')
    },
    acceptBooking (id) {
      console.log('confirmada')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
