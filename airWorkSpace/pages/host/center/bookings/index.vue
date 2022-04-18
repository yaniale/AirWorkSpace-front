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
        <v-card v-if="bookings.length === 0" flat>
          <v-card-text class="subtitle1">
            You don't have any open booking yet.
          </v-card-text>
        </v-card>
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
            <v-list-item-subtitle>
              Requested quantity: {{ booking.bookedQuantity }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1 mb-1 text-wrap">
              Total Price: {{ booking.totalRate }} €
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-spacer />
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="error"
                v-bind="attrs"
                class="mx-5"
                v-on="on"
              >
                Reject
              </v-btn>
            </template>
            <template #default="dialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                  height="40px"
                >
                  Do you really want to reject?
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
                    @click="rejectBooking(booking._id); dialog.value = false"
                  >
                    <!-- @click="dialog.value = false" -->
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                Accept
              </v-btn>
            </template>
            <template #default="dialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                  height="40px"
                >
                  Do you really want to accept?
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
                    @click="acceptBooking(booking._id); dialog.value = false"
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
    <v-col v-else offset="1">
      <v-card flat>
        <v-card-title class="px-16 mx-12 font-weight-bold headline">
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/', component:'MyCenterPage'})">
            mdi-chevron-left
          </v-icon>
          Pending Bookings in {{ center.name }}
        </v-card-title>
        <v-col offset="1">
          <v-card v-if="bookings.length === 0" flat>
            <v-card-text class="headline">
              You don't have any open booking yet.
            </v-card-text>
          </v-card>
        </v-col>
      </v-card>
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
              <v-list-item-subtitle class="title mb-1 text-wrap">
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
            <v-card-actions>
              <v-spacer />
              <v-dialog
                transition="dialog-top-transition"
                max-width="600"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="error"
                    v-bind="attrs"
                    class="mx-5"
                    v-on="on"
                  >
                    Reject
                  </v-btn>
                </template>
                <template #default="dialog">
                  <v-card>
                    <v-toolbar
                      color="primary"
                      dark
                      height="40px"
                    >
                      Do you really want to reject?
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
                        @click="rejectBooking(booking._id); dialog.value = false"
                      >
                        <!-- @click="dialog.value = false" -->
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog
                transition="dialog-top-transition"
                max-width="600"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Accept
                  </v-btn>
                </template>
                <template #default="dialog">
                  <v-card>
                    <v-toolbar
                      color="primary"
                      dark
                      height="40px"
                    >
                      Do you really want to accept?
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
                        @click="acceptBooking(booking._id); dialog.value = false"
                      >
                        <!-- @click="dialog.value = false" -->
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-actions>
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

      for (let i = 0; i < this.center.bookings.length; i++) {
        const element = this.center.bookings[i]
        if (element.status === 'open') {
          this.bookings.push(element)
        }
      }
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
    async getOneCenter (id) {
      this.data = await this.$axios.get(`/center/${id}`)
      const load = [this.data.data]
      this.$store.commit('addCenters', load)
    },
    async rejectBooking (id) {
      await this.$axios.put(`/center/${this.center._id}/bookings/${id}`, { status: 'rejected' })
      await this.getOneCenter(this.center._id)
      this.bookings = []
      this.getBookings()
      this.$store.commit('checkHost', this.$auth.$state.user.role)
    },
    async acceptBooking (id) {
      await this.$axios.put(`/center/${this.center._id}/bookings/${id}`, { status: 'confirmed' })
      await this.getOneCenter(this.center._id)
      this.bookings = []
      this.getBookings()
      this.$store.commit('checkHost', this.$auth.$state.user.role)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
