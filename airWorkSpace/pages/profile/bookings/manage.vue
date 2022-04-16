<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          :src="booking.center.photos[0]"
        >
          <v-card-title>
            {{ booking.center.name }}
          </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          {{ booking.center.type }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ booking.center.description }}</div>
          <!-- Ubicación -->
          <v-input
            prepend-icon="mdi-map-marker-outline"
          >
            Location
            <v-btn
              icon
              @click="show = !show"
            >
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <v-expand-transition>
              <div v-show="show">
                <v-divider />
                <v-card-text>
                  <span>{{ booking.center.address1 }} -</span>
                  <span>{{ booking.center.address2 }} -</span>
                  <span>{{ booking.center.postalCode }} -</span>
                  <span>{{ booking.center.city }} -</span>
                  <span>{{ booking.center.country }}</span>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-input>
          <v-divider />
          <!-- Tipos de mesa -->
          <v-card-title>
            Your Booking
          </v-card-title>
          <v-card-text>
            <v-list-item three-line>
              <v-list-item-content>
                <div :class="`text-overline mb-4 ${statusColor(booking.status)}--text`">
                  {{ booking.status }}
                </div>
                <v-list-item-title class="text-h7 mb-1 text-wrap">
                  {{ getType(booking.type) }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="booking.status === 'confirmed'">
                  Termina en: {{ formatDate(booking.toTime) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="booking.status === 'open'">
                  Pendiente hasta: {{ formatDate(booking.fromTime) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  Finalizado desde: {{ formatDate(booking.toTime) }}
                </v-list-item-subtitle>
                <v-divider />
                <v-spacer class="my-2" />
                <v-input hide-details>
                  <v-list-item-subtitle>
                    Desde: {{ formatDate(booking.fromTime) }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Hasta: {{ formatDate(booking.toTime) }}
                  </v-list-item-subtitle>
                </v-input>
                <v-spacer class="my-2" />
                <v-list-item-subtitle v-if="booking.status==='open'">
                  Cantidad solicitada: {{ booking.bookedQuantity }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancelBooking(booking._id)">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'
export default {
  name: 'ManageBooking',
  data () {
    return {
      show: false,
      booking: this.$auth.$state.user.bookings.find(element => element._id === this.$route.query.id)
    }
  },
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
    },
    async cancelBooking (id) {
      await this.$axios.put(`/user/profile/bookings/${id}`)
      await this.$auth.fetchUser()
      this.$router.push('/profile/bookings')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
