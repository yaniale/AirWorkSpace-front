<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/', component:'MyCenterPage'})">
            mdi-chevron-left
          </v-icon>
          Total Bookings
        </v-card-title>
      </v-card>
      <v-card v-if="bookings.length === 0" flat>
        <v-card-text class="subtitle1">
          You don't have any booking yet.
        </v-card-text>
      </v-card>
      <v-card
        v-for="(booking, idx) in bookings"
        :key="idx"
        class=" mx-auto my-2 rounded-xl"
        width="90%"
        elevation="2"
        :class="booking.status === 'rejected' ? 'elevation-0' : '' || booking.status === 'cancelled' ? 'elevation-0' : '' "
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
              {{ booking.status }}
            </div>
            <v-list-item-subtitle>{{ getType(booking.type) }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text-h7 mb-1 text-wrap">
              Customer: {{ booking.customerId.firstName }} {{ booking.customerId.lastName }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="booking.status==='open'"
            >
              Pending until: {{ formatDate(booking.fromTime) }}
            </v-list-item-subtitle>
            <v-divider />
            <v-spacer
              class="
              my-2"
            />
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
        <v-card-actions
          v-if="booking.status === 'open'"
        >
          <v-spacer />
          <v-btn class="error" @click="rejectBooking(booking._id )">
            Reject
          </v-btn>
          <v-btn class="primary" @click="acceptBooking(booking._id)">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- breakpoint mdAndUp -->
    <v-col v-else offset="2" cols="8">
      <v-card flat>
        <v-card-title class="px-16 mx-12 font-weight-bold headline">
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/', component:'MyCenterPage'})">
            mdi-chevron-left
          </v-icon>
          Total Bookings in {{ center.name }}
        </v-card-title>
      </v-card>
      <v-col offset="1">
        <v-card v-if="bookings.length === 0" flat>
          <v-card-text class="headline">
            You don't have any booking yet.
          </v-card-text>
        </v-card>
      </v-col>

      <v-card
        v-for="(booking, idx) in bookings"
        :key="idx"
        class=" mx-auto my-2 rounded-xl"
        width="90%"
        elevation="2"
        :class="booking.status === 'rejected' ? 'elevation-0' : '' || booking.status === 'cancelled' ? 'elevation-0' : '' "
      >
        <v-list-item three-line>
          <v-col>
            <v-list-item-content>
              <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
                {{ booking.status }}
              </div>
              <v-list-item-subtitle v-if="booking.status === 'rejected' || booking.status ==='cancelled'">
                {{ getType(booking.type) }}
              </v-list-item-subtitle>
              <div v-if="booking.status === 'open' || booking.status ==='confirmed'">
                <v-chip outlined>
                  {{ getType(booking.type) }}
                </v-chip>
              </div>
              <v-list-item-subtitle class="text-h7 mb-1 text-wrap" :class="booking.status ==='open' || booking.status ==='confirmed' ? 'title' : ''">
                Customer: {{ booking.customerId.firstName }} {{ booking.customerId.lastName }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="booking.status==='open'"
                class="title pb-2"
              >
                Pending until: {{ formatDate(booking.fromTime) }}
              </v-list-item-subtitle>
              <v-divider />
              <v-spacer
                class="
              my-2"
              />
              <v-input hide-details>
                <v-list-item-subtitle class="text-h7 mb-1 text-wrap" :class="booking.status ==='open' || booking.status ==='confirmed' ? 'subtitle' : ''">
                  From: {{ formatDate(booking.fromTime) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-h7 mb-1 text-wrap" :class="booking.status ==='open' || booking.status ==='confirmed' ? 'subtitle' : ''">
                  To: {{ formatDate(booking.toTime) }}
                </v-list-item-subtitle>
              </v-input>
              <v-spacer class="my-2" />
              <v-list-item-subtitle v-if="booking.status==='open' || booking.status === 'confirmed'" class="subtitle mb-1 text-wrap">
                Requested quantity: {{ booking.bookedQuantity }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-card-actions
              v-if="booking.status === 'open'"
            >
              <v-spacer />
              <v-btn class="error" @click="rejectBooking(booking._id)">
                Reject
              </v-btn>
              <v-btn class="primary" @click="acceptBooking(booking._id)">
                Accept
              </v-btn>
            </v-card-actions>
          </v-col>

          <v-col>
            <v-list-item-subtitle>
              Rate: {{ booking.ratePlan[0].price }} €
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Total Price: {{ booking.totalRate }} €
            </v-list-item-subtitle>
          </v-col>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'TotalBookings',
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
      this.bookings = this.center.bookings
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
      await this.$axios.put(`/center/${this.center._id}/bookings/${id}`, { status: 'confirmed' })
      window.location.reload(true)
      this.$store.commit('checkHost', this.$auth.$state.user.role)
    },
    async acceptBooking (id) {
      await this.$axios.put(`/center/${this.center._id}/bookings/${id}`, { status: 'confirmed' })
      window.location.reload(true)
      this.$store.commit('checkHost', this.$auth.$state.user.role)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
