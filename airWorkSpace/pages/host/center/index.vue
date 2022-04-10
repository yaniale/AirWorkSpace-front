<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.xs">
      <v-card flat>
        <v-card-title class="justify-center">
          My Centers
        </v-card-title>
      </v-card>
      <v-card v-if="centers.length === 0">
        <v-card-text>You don't have any center submited yet.</v-card-text>
      </v-card>
      <v-card
        v-for="(center, idx) in centers"
        :key="idx"
        class="mx-auto my-2"
        width="90%"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h7 mb-1 text-wrap">
              {{ center.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ center.city }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            color="grey"
            @click="getOneCenter(center._id)"
          >
            <v-img :src="center.photos[0]" />
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-spacer />

          <v-btn
            class="mx-4"
            icon
            @click="updateShow(idx)"
          >
            {{ showDetails[idx] ? 'Less': 'More' }}
            <v-icon>{{ showDetails[idx] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showDetails[idx]">
            <v-divider />

            <v-card-text>
              <v-card-subtitle class="py-0">
                <v-row>
                  <v-col cols="8" offset="1" class="py-2">
                    <v-icon class="warning--text">
                      mdi-clock
                    </v-icon>
                    Bookings to manage:
                  </v-col>
                  <v-col>
                    <a @click="$router.push({ path:`/host/center/bookings/`, query:{id: center._id}, component:'HostBookingsPage'})">{{ center.bookings.filter(e => e.status === 'open').length }} </a>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-subtitle class="py-0">
                <v-row>
                  <v-col cols="8" offset="1" class="py-2">
                    <v-icon class="success--text">
                      mdi-check
                    </v-icon>
                    Confirmed bookings:
                  </v-col>
                  <v-col>
                    <a @click="$router.push({ path:`/host/center/bookings/confirmed`, query:{id: center._id}, component:'ConfirmedBookings'})">{{ center.bookings.filter(e => e.status === 'confirmed').length }}</a>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-subtitle class="py-0">
                <v-row>
                  <v-col cols="8" offset="1" class="py-2">
                    <v-icon>
                      mdi-book-outline
                    </v-icon>
                    Total Bookings:
                  </v-col>
                  <v-col> <a @click="$router.push({ path:`/host/center/bookings/total`, query:{id: center._id}, component:'TotalBookings'})">{{ center.bookings.length }}</a></v-col>
                </v-row>
              </v-card-subtitle>
              <v-divider />
              <v-card-subtitle class="pt-3">
                <v-row>
                  <v-col cols="8" offset="1" class="py-2">
                    <v-icon>
                      mdi-currency-eur
                    </v-icon>
                    Earnings:
                  </v-col>
                  <v-col>€</v-col>
                </v-row>
              </v-card-subtitle>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
    <!-- Breakpoint SM -->
    <v-col v-if="$vuetify.breakpoint.sm" sm="12">
      <v-card flat>
        <v-card-title class="justify-center">
          My Centers
        </v-card-title>
      </v-card>
      <v-col>
        <v-card v-if="centers.length === 0">
          <v-card-text>You don't have any center submited yet.</v-card-text>
        </v-card>
        <v-col>
          <v-card
            v-for="(center, idx) in centers"
            :key="idx"
            class="mx-auto my-2"
            width="90%"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h7 mb-1 text-wrap">
                  {{ center.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ center.city }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
                @click="getOneCenter(center._id)"
              >
                <v-img :src="center.photos[0]" />
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-spacer />

              <v-btn
                class="mx-4"
                icon
                @click="updateShow(idx)"
              >
                {{ showDetails[idx] ? 'Less': 'More' }}
                <v-icon>{{ showDetails[idx] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="showDetails[idx]">
                <v-divider />

                <v-card-text>
                  <v-card-subtitle class="py-0">
                    <v-row>
                      <v-col cols="5" offset="3" class="py-2">
                        <v-icon class="warning--text">
                          mdi-clock
                        </v-icon>
                        Bookings to manage:
                      </v-col>
                      <v-col>
                        <a @click="getOneCenterBookings(center._id)">{{ center.bookings.filter(e => e.status === 'open').length }} </a>
                      </v-col>
                    </v-row>
                  </v-card-subtitle>
                  <v-card-subtitle class="py-0">
                    <v-row>
                      <v-col cols="5" offset="3" class="py-2">
                        <v-icon class="success--text">
                          mdi-check
                        </v-icon>
                        Confirmed bookings:
                      </v-col>
                      <v-col>
                        <a @click="$router.push({ path:`/host/center/bookings/confirmed`, query:{id: center._id}, component:'ConfirmedBookings'})">{{ center.bookings.filter(e => e.status === 'confirmed').length }}</a>
                      </v-col>
                    </v-row>
                  </v-card-subtitle>
                  <v-card-subtitle class="py-0">
                    <v-row>
                      <v-col cols="5" offset="3" class="py-2">
                        <v-icon>
                          mdi-book-outline
                        </v-icon>
                        Total Bookings:
                      </v-col>
                      <v-col> <a @click="$router.push({ path:`/host/center/bookings/total`, query:{id: center._id}, component:'TotalBookings'})">{{ center.bookings.length }}</a></v-col>
                    </v-row>
                  </v-card-subtitle>
                  <v-divider />
                  <v-card-subtitle class="pt-3">
                    <v-row>
                      <v-col cols="5" offset="3" class="py-2">
                        <v-icon>
                          mdi-currency-eur
                        </v-icon>
                        Earnings:
                      </v-col>
                      <v-col>€</v-col>
                    </v-row>
                  </v-card-subtitle>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MyCenterPage',
  data () {
    return {
      centers: [],
      showDetails: [],
      openBookings: ''
    }
  },
  mounted () {
    this.getMyCenters()
  },
  methods: {
    async getMyCenters () {
      const myCenters = await this.$axios.get(`/center?owner=${this.$auth.$state.user._id}`)
      this.centers = myCenters.data
      this.$store.commit('addCenters', this.centers)
    },
    async getOneCenter (id) {
      this.data = await this.$axios.get(`/center/${id}`)
      const load = [this.data.data]
      this.$store.commit('addCenters', load)
      this.$router.push({ path: '/center/', query: { id }, component: 'CenterPage' })
    },
    updateShow (idx) {
      const boolean = !this.showDetails[idx]
      this.$set(this.showDetails, idx, boolean)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
