<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="8">
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
        <v-card v-else elevation="0">
          <v-card-title class="text-h4">
            {{ center.name }}
          </v-card-title>
          <v-card-subtitle>
            <v-row>
              <v-col class="text-h6">
                {{ center.city }}, {{ center.country }}
              </v-col>
              <v-col justify="right" align="right">
                <v-icon>mdi-heart</v-icon>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-carousel
            style="border-top-left-radius: 25px; border-top-right-radius: 25px"
            cycle
            height="50vh"
            hide-delimiter-background
            hide-delimiters
            :show-arrows="false"
          >
            <v-carousel-item v-for="(photo, idx) in center.photos" :key="idx">
              <v-img :src="photo" contain position="center" />
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="8">
                  <div class="text-h6 mb-5">
                    <v-icon>
                      mdi-map-marker-outline
                    </v-icon>
                    {{ center.address1 }} {{ center.address2 ? `- ${center.address2}` : '' }}, {{ center.postalCode }}
                  </div>
                  <div id="map" />
                  <div class="text-h5">
                    {{ center.description }}
                  </div>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <v-card-title>
                      Opciones
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CenterPage',
  data () {
    return {
      center: {},
      show: false,
      map: ''
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
