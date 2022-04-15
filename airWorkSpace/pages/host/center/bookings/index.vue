<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/', component:'MyCenterPage'})">
            mdi-chevron-left
          </v-icon>
          Pending Bookings
        </v-card-title>
        <v-card v-if="bookings.length === 0">
          You don't have any confirmed booking yet.
        </v-card>
      </v-card>
      <v-card v-for="(booking, idx) in bookings" :key="idx" class=" mx-auto my-2 rounded-xl" width="90%">
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
          <v-btn class="error" @click="rejectBooking(booking._id )">
            Reject
          </v-btn>
          <v-btn class="primary mx-2" @click="acceptBooking(booking._id)">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    y
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
    this.getBookings()
  },
  methods: {
    getBookings () {
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
    async rejectBooking (id) {
      const confirmed = await this.$axios.put(`/center/${this.center._id}/bookings/${id}`, { status: 'confirmed' })
      window.location.reload(true)
      this.$store.commit('checkHost', this.$auth.$state.user.role)
      console.log(confirmed)
    },
    async acceptBooking (id) {
      const confirmed = await this.$axios.put(`/center/${this.center._id}/bookings/${id}`, { status: 'confirmed' })
      window.location.reload(true)
      this.$store.commit('checkHost', this.$auth.$state.user.role)
      console.log(confirmed)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
