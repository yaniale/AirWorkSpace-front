<template>
  <v-row justify="center" align="center">
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card-title width="90%" class="px-10 font-weight-bold headline">
        Bookings
      </v-card-title>
      <v-card v-if="$auth.$state.user.bookings.filter(e => e.status !== 'cancelled').length === 0">
        <v-card-text>You don't have any booking yet.</v-card-text>
      </v-card>
      <v-card
        v-for="(booking, idx) in $auth.$state.user.bookings.filter(e => e.status !== 'cancelled')"
        :key="idx"
        class="mx-auto my-2 rounded-xl"
        width="90%"
        outlined
        elevation="2"
        :class="booking.status === 'rejected' ? 'elevation-0' : '' "
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
              {{ booking.status }}
            </div>
            <v-list-item-title class="text-h7 mb-1 text-wrap">
              {{ booking.center.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ getType(booking.type) }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="booking.status === 'confirmed'">
              Finish on: {{ formatDate(booking.toTime) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="booking.status === 'open'">
              Pending until: {{ formatDate(booking.fromTime) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              Finished since: {{ formatDate(booking.toTime) }}
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
    <v-col v-else offset="1">
      <v-card-title width="90%" class="px-16 mx-12 font-weight-bold headline">
        Bookings
      </v-card-title>
      <v-card v-if="$auth.$state.user.bookings.filter(e => e.status !== 'cancelled').length === 0">
        <v-card-text>You don't have any booking yet.</v-card-text>
      </v-card>
      <v-card
        v-for="(booking, idx) in $auth.$state.user.bookings.filter(e => e.status !== 'cancelled')"
        :key="idx"
        flat
        class="mx-auto my-2 rounded-xl"
        width="90%"
      >
        <v-list-item three-line>
          <v-col class="pr-0">
            <v-list-item-content style="height:300px">
              <div :class="`text-overline mb-4 text-capitalize ${statusColor(booking.status)}--text`">
                {{ booking.status }}
              </div>
              <v-list-item-title class="headline font-weight-bold mb-1 text-wrap">
                {{ booking.center.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle text-wrap">
                <v-icon>mdi-map-marker-outline</v-icon>
                {{ booking.center.address1 }} {{ booking.center.address2 ? ` - ${booking.center.address2} - ` : '' }} , {{ booking.center.postalCode }} {{ booking.center.city }} , {{ booking.center.country }}
              </v-list-item-subtitle>
              <v-list-item-title class="title">
                <v-chip outlined>
                  {{ booking.center.type }}
                </v-chip>
              </v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>{{ getType(booking.type) }}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="booking.status === 'confirmed'">
                Finish on: {{ formatDate(booking.toTime) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="booking.status === 'open'">
                Pending until: {{ formatDate(booking.fromTime) }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                Finished since: {{ formatDate(booking.toTime) }}
              </v-list-item-subtitle>

              <v-list-item-action>
                <v-spacer />
                <v-btn v-if="booking.status === 'rejected' ? false : true" class="mr-5 px-2" :to="`/profile/bookings/manage/?id=${booking._id}`" color="primary">
                  Manage Booking
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-col>
          <v-col>
            <v-list-item-avatar
              tile
              size="300"
              color="grey"
              class="rounded-xl mx-10"
            >
              <v-img :src="booking.center.photos[0]" cover />
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
  name: 'BookingsPage',
  middleware: 'auth',
  methods: {
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
