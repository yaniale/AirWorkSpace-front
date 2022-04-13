<template>
  <v-container fluid class="mx-0 px-0">
    <v-card
      v-if="!$vuetify.breakpoint.mdAndUp"
      elevation="0"
      class="mx-0 px-0"
    >
      <v-img
        class="white--text align-end"
        style="border-top-left-radius:25px; border-top-right-radius:25px"
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

      <v-card-text class="text--primary mx-0">
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
        <v-card elevation="0" width="100%" class="mx-0 px-0">
          <v-card-title class="mx-0">
            Start your reservation
          </v-card-title>
          <v-stepper
            v-model="e6"
            elevation="0"
            class="mx-0 px-0"
          >
            <v-stepper-header>
              <v-stepper-step
                :complete="e6 > 1"
                step="1"
              >
                Select your accomodation
                <small>These are our current allotments</small>
              </v-stepper-step>
              <v-divider />
              <v-stepper-step
                :complete="e6 > 2"
                step="2"
              >
                Select your Rate Plan
              </v-stepper-step>
              <v-divider />
              <v-stepper-step
                :complete="e6 > 3"
                step="3"
              >
                Complete your reservation
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content step="1">
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
                  @click="stepperRate(allotment.type)"
                >
                  <v-card-subtitle>{{ center.allotment[idx].name }}</v-card-subtitle>
                  <!-- añadir foto?? -->
                  <v-divider />
                </v-card>
              </v-hover>
            </v-stepper-content>

            <v-stepper-content class="mx-0 px-0" step="2">
              <RatePlanComponent :rate-plan="stepperPlan" :center="center" @rateSelected="bookingStep($store.state.bookingSelect.rateId)" />
            </v-stepper-content>

            <v-stepper-content class="mx-0 px-0" step="3">
              <BookingFormComponent :center-id="center._id" :rate-id="rateId">
                <v-btn
                  color="primary"
                  @click="e6 = 4"
                >
                  Continue
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </bookingformcomponent>
            </v-stepper-content>
          </v-stepper>
        </v-card>
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
        height="40vh"
        hide-delimiter-background
        hide-delimiters
        :show-arrows="false"
      >
        <v-carousel-item v-for="(photo, idx) in center.photos" :key="idx">
          <v-img :src="photo" contain position="center" />
        </v-carousel-item>
      </v-carousel>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="8">
              <div class="text-h6 mb-5">
                <v-icon>
                  mdi-map-marker-outline
                </v-icon>
                {{ center.address1 }} {{ center.address2 ? `- ${center.address2}` : '' }}, {{ center.postalCode }}
              </div>
              <GoogleMapsCenters :centers="centerMap" height="200px" />
              <div class="text-h5 mt-5">
                {{ center.description }}
              </div>
            </v-col>
            <v-col cols="4">
              <v-card>
                <v-card-title>
                  Start your reservation
                </v-card-title>
                <v-stepper
                  v-model="e6"
                  vertical
                >
                  <v-stepper-step
                    :complete="e6 > 1"
                    step="1"
                  >
                    Select your accomodation
                    <small>These are our current allotments</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card-text>
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
                          @click="stepperRate(allotment.type)"
                        >
                          <v-card-subtitle>{{ center.allotment[idx].name }}</v-card-subtitle>
                          <!-- añadir foto?? -->
                          <v-divider />
                        </v-card>
                      </v-hover>
                    </v-card-text>
                  </v-stepper-content>

                  <v-stepper-step
                    :complete="e6 > 2"
                    step="2"
                  >
                    Select your Rate Plan
                  </v-stepper-step>

                  <v-stepper-content step="2">
                    <RatePlanComponent :rate-plan="stepperPlan" :center="center" @rateSelected="bookingStep($store.state.bookingSelect.rateId)" />
                    <v-btn
                      color="primary"
                      @click="e6 = 3"
                    >
                      Continue
                    </v-btn>
                    <v-btn text @click="e6 -= e6">
                      Back
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-step
                    :complete="e6 > 3"
                    step="3"
                  >
                    Complete your reservation
                  </v-stepper-step>

                  <v-stepper-content step="3">
                    <BookingFormComponent :center-id="center._id" :rate-id="rateId">
                      <v-btn
                        color="primary"
                        @click="e6 = 4"
                      >
                        Continue
                      </v-btn>
                      <v-btn text>
                        Cancel
                      </v-btn>
                    </bookingformcomponent>
                  </v-stepper-content>
                </v-stepper>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CenterPage',
  data () {
    return {
      center: {},
      centerMap: [],
      show: false,
      map: '',
      e6: 1,
      stepperType: '',
      stepperPlan: [],
      rateId: ''
    }
  },
  beforeMount () {
    this.getCenter()
  },
  methods: {
    getCenter () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
      this.centerMap.push(this.center)
    },
    stepperRate (id) {
      this.e6 = 2
      this.stepperType = id
      this.stepperPlan = this.center.ratePlan.filter(e => e.appliesTo === id)
    },
    bookingStep (rateId) {
      this.e6 = 3
      this.rateId = rateId
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
