<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/', component:'MyCenterPage'})">
            mdi-chevron-left
          </v-icon>
          Confirmed Bookings
        </v-card-title>
      </v-card>
      <v-card v-if="bookings.length === 0" flat>
        <v-card-text class="subtitle1">
          You haven't confirmed any booking yet.
        </v-card-text>
      </v-card>

      <v-card v-for="(booking, idx) in bookings" :key="idx" class=" mx-auto my-2 rounded-xl" width="90%">
        <v-list-item three-line>
          <v-list-item-content>
            <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
              {{ booking.status }}
            </div>
            <v-list-item-subtitle>{{ getType(booking.type) }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text-h7 mb-1 text-wrap">
              Customer: {{ booking.customerId.firstName }} {{ booking.customerId.lastName }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="pb-2">
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
            <v-list-item-subtitle>
              Requested quantity: {{ booking.bookedQuantity }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <!-- breakpoint mdAndUp -->
    <v-col v-else offset="1">
      <v-card flat>
        <v-card-title class="px-16 mx-12 font-weight-bold headline">
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/', component:'MyCenterPage'})">
            mdi-chevron-left
          </v-icon>
          Confirmed Bookings in {{ center.name }}
        </v-card-title>
      </v-card>
      <v-col offset="1">
        <v-card v-if="bookings.length === 0" flat>
          <v-card-text class="headline">
            You haven't confirmed any booking yet.
          </v-card-text>
        </v-card>
      </v-col>
      <v-card v-for="(booking, idx) in bookings" :key="idx" flat class=" mx-auto my-2 rounded-xl" width="90%">
        <v-list-item three-line>
          <v-col>
            <v-list-item-content style="height:300px">
              <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
                {{ booking.status }}
              </div>
              <div>
                <v-chip outlined>
                  {{ getType(booking.type) }}
                </v-chip>
              </div>
              <v-list-item-subtitle class="title mb-1 text-wrap">
                Customer: {{ booking.customerId.firstName }} {{ booking.customerId.lastName }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="title pb-2">
                Pending until: {{ formatDate(booking.fromTime) }}
              </v-list-item-subtitle>
              <v-divider />
              <v-spacer class="my-2" />
              <v-input hide-details>
                <v-list-item-subtitle class="subtitle-1 mb-1 text-wrap">
                  From: {{ formatDate(booking.fromTime) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="subtitle-1 mb-1 text-wrap">
                  To: {{ formatDate(booking.toTime) }}
                </v-list-item-subtitle>
              </v-input>
              <v-spacer class="my-2" />
              <v-list-item-subtitle class="subtitle-1 mb-1 text-wrap">
                Requested quantity: {{ booking.bookedQuantity }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1 mb-1 text-wrap">
                Total Price: {{ booking.totalRate }} €
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
          <v-col>
            <v-list-item-avatar
              tile
              size="300"
              color="grey"
              class="rounded-xl mx-10"
            >
              <v-img
                :src="center.photos[0]"
                cover
              />
            </v-list-item-avatar>
          </v-col>
        </v-list-item>
        <v-divider width="75%" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'ConfirmedBookings',
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
      this.bookings = this.center.bookings.filter(e => e.status === 'confirmed')
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
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
