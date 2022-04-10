<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        v-if="!$vuetify.breakpoint.mdAndUp"
        class="mx-auto"
        max-width="400"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>
            {{ center.name }}
          </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          {{ center.type }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ center.description }}</div>
          <!-- Ubicación -->
          <v-input
            prepend-icon="mdi-map-marker-outline"
          >
            Dónde estamos
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
                  <span>{{ center.address1 }} -</span>
                  <span>{{ center.address2 }} -</span>
                  <span>{{ center.postalCode }} -</span>
                  <span>{{ center.city }} -</span>
                  <span>{{ center.country }}</span>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-input>
          <v-divider />
          <!-- Tipos de mesa -->
          <v-card-title>
            Elige tu espacio
          </v-card-title>
          <v-hover
            v-for="(allotment, idx) in center.allotment"
            v-slot="{ hover }"
            :key="idx"
            class="ma-2"
            open-delay="200"
          >
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              flat
              @click="$router.push({ path:`/center/rateplan`, query:{type: allotment.type, id: center._id}, component:'RatePlanPage'})"
            >
              <v-card-subtitle>{{ center.allotment[idx].name }}</v-card-subtitle>
              <!-- añadir foto?? -->
              <v-divider />
            </v-card>
          </v-hover>
        </v-card-text>
      </v-card>
      <v-card v-else />
      {{ map }}
    </v-col>
  </v-row>
</template>

<script>
const apikey = 'AIzaSyCiLXGaYak900xP8DJXqsslSxLBFRD_hb0'
export default {
  name: 'CenterPage',
  data () {
    return {
      center: {},
      show: false,
      map: ''
    }
  },
  head () {
    return {
      script: [
        {
          hid: 'maps-googleapis',
          src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apikey}`,
          defer: true,
          callback: this.googleAutocompleteInit
        }
      ]
    }
  },
  mounted () {
    this.getCenter()
  },
  methods: {
    getCenter () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
    }
  }
}
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
