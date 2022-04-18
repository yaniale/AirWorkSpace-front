<template>
  <v-row justify="center" align="center">
    <v-col v-if="$vuetify.breakpoint.smAndDown" class="pa-0">
      <v-card
        width="100%"
        flat
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

        <v-chip outlined class="mt-2 ml-3 px-1 caption">
          {{ booking.center.type }}
        </v-chip>

        <v-card-text class="text--primary py-0">
          <div class="pb-2">
            {{ booking.center.description }}
          </div>
          <!-- Ubicación -->
          <v-input
            prepend-icon="mdi-map-marker-outline"
            hide-details
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
          <v-card-title class="pb-0">
            Your Booking
          </v-card-title>
          <v-card-text class="pb-2">
            <v-list-item three-line>
              <v-list-item-content class="pb-0">
                <div :class="`text-overline mb-3 ${statusColor(booking.status)}--text`">
                  {{ booking.status }}
                </div>
                <v-list-item-title class="text-h7 mb-1 text-wrap">
                  <v-chip outlined class="caption px-2">
                    {{ getType(booking.type) }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle v-if="booking.status === 'confirmed'">
                  Finish on: {{ formatDate(booking.toTime) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="booking.status === 'open'">
                  Pending until: {{ formatDate(booking.fromTime) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="booking.status === 'closed'">
                  Finished since: {{ formatDate(booking.toTime) }}
                </v-list-item-subtitle>
                <v-divider class="my-2" />
                <v-input hide-details>
                  <v-list-item-subtitle>
                    From: {{ formatDate(booking.fromTime) }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    To: {{ formatDate(booking.toTime) }}
                  </v-list-item-subtitle>
                </v-input>
                <v-list-item-subtitle v-if="booking.status==='open'" class="my-2">
                  Requested quantity: {{ booking.bookedQuantity }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card-text>
        <v-card-actions class="mr-5">
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
          >
            <template #activator="{ on, attrs }">
              <v-spacer />
              <v-btn
                color="error"
                v-bind="attrs"
                v-on="on"
              >
                Cancel
              </v-btn>
            </template>
            <template #default="dialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                  height="40px"
                >
                  Do you really want to cancel?
                </v-toolbar>
                <v-card-text>
                  <div class="px-4 pt-6 ">
                    Reservation:
                  </div>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle class="pb-2 black--text">
                        From: {{ formatDate(booking.fromTime) }} - To:
                        {{ formatDate(booking.toTime) }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="black--text">
                        Quantity {{ booking.bookedQuantity }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="dialog.value = false"
                  >
                    No
                  </v-btn>
                  <v-btn
                    text
                    class="primary--text"
                    @click="cancelBooking(booking._id)"
                  >
                    <!-- @click="dialog.value = false" -->
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Breakpoint mdAndUp -->
    <v-col v-else>
      <v-card
        width="90%"
        class="mx-auto"
        flat
      >
        <v-card-title>Your Booking in {{ booking.center.name }}</v-card-title>
        <v-row>
          <v-col>
            <!-- Tipos de mesa -->

            <v-card-text class="pb-0">
              <v-list-item three-line>
                <v-list-item-content class="pb-0">
                  <div :class="`text-overline mb-3 ${statusColor(booking.status)}--text`">
                    {{ booking.status }}
                  </div>
                  <v-list-item-title class=" mb-1 text-wrap">
                    {{ getType(booking.type) }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="booking.status === 'confirmed'">
                    Finish on: {{ formatDate(booking.toTime) }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="booking.status === 'open'">
                    Pending until: {{ formatDate(booking.fromTime) }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="booking.status === 'closed'">
                    Finished since: {{ formatDate(booking.toTime) }}
                  </v-list-item-subtitle>
                  <v-divider class="my-2" />
                  <v-input hide-details>
                    <v-list-item-subtitle>
                      From: {{ formatDate(booking.fromTime) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      To: {{ formatDate(booking.toTime) }}
                    </v-list-item-subtitle>
                  </v-input>
                  <v-list-item-subtitle class="my-2">
                    Requested quantity: {{ booking.bookedQuantity }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="my-2">
                    Rate: {{ booking.ratePlan[0].price }} €
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Total Price: {{ booking.totalRate }} €
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>

            <v-card-actions class="mr-5">
              <v-dialog
                transition="dialog-top-transition"
                max-width="600"
              >
                <template #activator="{ on, attrs }">
                  <v-spacer />
                  <v-btn
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Cancel
                  </v-btn>
                </template>
                <template #default="dialog">
                  <v-card>
                    <v-toolbar
                      color="primary"
                      dark
                      height="40px"
                    >
                      Do you really want to cancel?
                    </v-toolbar>
                    <v-card-text>
                      <div class="px-4 pt-6 ">
                        Reservation:
                      </div>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-subtitle class="pb-2 black--text">
                            From: {{ formatDate(booking.fromTime) }} - To:
                            {{ formatDate(booking.toTime) }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="black--text">
                            Quantity: {{ booking.bookedQuantity }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        text
                        @click="dialog.value = false"
                      >
                        No
                      </v-btn>
                      <v-btn
                        text
                        class="primary--text"
                        @click="cancelBooking(booking._id)"
                      >
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-actions>
          </v-col>
          <v-col cols="5">
            <v-carousel
              class="rounded-xl"
              cycle
              height="40vh"
              hide-delimiter-background
              :show-arrows="false"
            >
              <v-carousel-item v-for="(photo, idx) in booking.center.photos" :key="idx">
                <v-img :src="photo" contain position="center" />
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <v-divider class="my-2 mx-8" />
        <v-row>
          <v-col class="px-8 py-0">
            <v-card-subtitle>
              {{ booking.center.name }}
              <v-chip outlined class="ml-3  caption">
                {{ booking.center.type }}
              </v-chip>
            </v-card-subtitle>

            <v-card-text class="text--primary py-0">
              <div class="pb-2">
                {{ booking.center.description }}
              </div>
              <!-- Ubicación -->
              <v-input
                prepend-icon="mdi-map-marker-outline"
                hide-details
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
            </v-card-text>
          </v-col>
        </v-row>
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
      booking: this.$auth.$state.user.bookings.find(element => element._id === this.$route.query.id),
      centerMap: []

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
