<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.xs">
      <v-card flat>
        <v-card-title width="90%" class="px-10 font-weight-bold headline">
          My Centers
        </v-card-title>
      </v-card>
      <v-card v-if="centers.length === 0" flat>
        <v-card-text class="subtitle1">
          You don't have any center submited yet.
        </v-card-text>
      </v-card>
      <v-card
        v-for="(center, idx) in centers"
        :key="idx"
        class="mx-auto my-2 my-2 rounded-xl"
        width="90%"
        flat
      >
        <v-list-item three-line class="pr-0">
          <v-list-item-content>
            <v-list-item-title class="text-h6 mb-1 text-wrap ">
              {{ center.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ center.city }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="130"
            class="rounded-xl "
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
              <!-- <v-divider />
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
              </v-card-subtitle> -->
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-divider />
      </v-card>
    </v-col>
    <!-- Breakpoint SM -->
    <v-col v-if="$vuetify.breakpoint.sm" sm="12">
      <v-card flat>
        <v-card-title width="90%" class="px-10 font-weight-bold headline">
          My Centers
        </v-card-title>
      </v-card>
      <v-col>
        <v-card v-if="centers.length === 0" flat>
          <v-card-text class="subtitle1">
            You don't have any center submited yet.
          </v-card-text>
        </v-card>
        <v-col>
          <v-card
            v-for="(center, idx) in centers"
            :key="idx"
            class="mx-auto my-2 rounded-xl"
            flat
            width="90%"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-1 text-wrap">
                  {{ center.name }}
                </v-list-item-title>
                <div>
                  <v-chip outlined class="caption">
                    {{ center.type }}
                  </v-chip>
                </div>
                <v-list-item-subtitle class="mx-2">
                  {{ center.city }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="150"
                class="rounded-xl"
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
                        <a @click="$router.push({ path:`/host/center/bookings/`, query:{id: center._id}, component:'HostBookingsPage'})">{{ center.bookings.filter(e => e.status === 'open').length }}  </a>
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
                  <!-- <v-divider /> -->
                  <!-- <v-card-subtitle class="pt-3">
                    <v-row>
                      <v-col cols="5" offset="3" class="py-2">
                        <v-icon>
                          mdi-currency-eur
                        </v-icon>
                        Earnings:
                      </v-col>
                      <v-col>€</v-col>
                    </v-row>
                  </v-card-subtitle> -->
                </v-card-text>
              </div>
            </v-expand-transition>
            <v-divider />
          </v-card>
        </v-col>
      </v-col>
    </v-col>
    <!-- Breakpoint mdAndUp -->
    <v-col v-if="$vuetify.breakpoint.mdAndUp" offset="1">
      <v-card flat class="mb-0">
        <v-card-title class="px-16 mx-12 font-weight-bold headline">
          My Centers
        </v-card-title>
        <v-col cols="1" offset="9">
          <v-card-actions>
            <v-btn color="primary" to="/host/center/newcenter">
              Add a Center
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-card>
      <v-card v-if="centers.length === 0" flat>
        <v-card-text class="headline">
          You don't have any center submited yet.
        </v-card-text>
      </v-card>
      <v-card
        v-for="(center, idx) in centers"
        :key="idx"
        class="mx-auto mb-10 rounded-xl"
        width="90%"
        flat
      >
        <v-row>
          <v-col cols="5" lg="6">
            <v-list-item three-line>
              <v-list-item-avatar
                tile
                size="300"
                class="rounded-xl"
                color="grey"
                @click="getOneCenter(center._id)"
              >
                <v-img :src="center.photos[0]" />
              </v-list-item-avatar>
              <v-list-item-content style="height:300px">
                <v-list-item-title class="headline font-weight-bold mb-0 mt-5 text-wrap" :class="$vuetify.breakpoint.md ? 'title':''">
                  {{ center.name }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="!$vuetify.breakpoint.md" class="subtitle text-wrap my-0">
                  <v-icon>mdi-map-marker-outline</v-icon>
                  {{ center.address1 }} {{ center.address2 ? ` - ${center.address2} - ` : '' }} , {{ center.postalCode }} {{ center.city }} , {{ center.country }}
                </v-list-item-subtitle>
                <v-list-item-title class="title mt-0">
                  <v-chip outlined>
                    {{ center.type }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="7" lg="6" class="colstyle">
            <v-card-text class="my-10">
              <v-card-subtitle class="subtitle-1 py-0">
                <v-row class="py-3">
                  <v-col cols="6" offset="1">
                    <v-icon class="warning--text">
                      mdi-clock
                    </v-icon>
                    Bookings to manage:
                  </v-col>
                  <v-col>
                    <a @click="$router.push({ path:`/host/center/bookings/`, query:{id: center._id}, component:'HostBookingsPage'})">{{ center.bookings.filter(e => e.status === 'open').length }}  </a>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-subtitle class="subtitle-1 py-0">
                <v-row class="py-3">
                  <v-col cols="6" offset="1">
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
              <v-card-subtitle class="subtitle-1 py-0">
                <v-row class="py-3">
                  <v-col cols="6" offset="1">
                    <v-icon>
                      mdi-book-outline
                    </v-icon>
                    Total Bookings:
                  </v-col>
                  <v-col> <a @click="$router.push({ path:`/host/center/bookings/total`, query:{id: center._id}, component:'TotalBookings'})">{{ center.bookings.length }}</a></v-col>
                </v-row>
              </v-card-subtitle>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
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
.colstyle {
  border-left:dotted 1px grey
}
</style>
