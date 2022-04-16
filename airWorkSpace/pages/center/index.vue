<template>
  <v-row>
    <v-col v-if="!$vuetify.breakpoint.mdAndUp" class="pa-0">
      <v-container fluid class="ma-0 pa-0">
        <v-card
          elevation="0"
          class="mx-0 px-0"
        >
          <v-carousel :show-arrows="false" height="40vh" class="ma-0 pa-0" hide-delimiter-background delimiter-icon="mdi-minus">
            <v-carousel-item
              v-for="(photo,idx) in center.photos"
              :key="idx"
              :src="photo"
              position="center"
            />
          </v-carousel>
          <!--
          <v-img
            class="white--text align-end"
            height="240px"
            :src="center.photos[0]"
          /> -->
          <v-card-title class="pb-0">
            {{ center.name }}
          </v-card-title>
          <v-chip outlined class="pb-0 px-2 mx-3 my-1 caption">
            {{ center.type }}
          </v-chip>

          <v-card-text class="text--primary mx-0 pt-0">
            <div>
              {{ center.description }}
            </div>
            <!-- Ubicación -->
            <v-input class="caption">
              <v-icon>mdi-map-marker-outline</v-icon>
              Location
              <v-card-text>
                <span class="caption">{{ center.address1 }} </span>
                <span class="caption">{{ center.address2 }} -</span>
                <span class="caption">{{ center.postalCode }} -</span>
                <span class="caption">{{ center.city }} -</span>
                <span class="caption">{{ center.country }}</span>
              </v-card-text>
              <v-divider />
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
                    Select your desk
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

                <v-stepper-content step="1" class="ma-2">
                  <v-hover
                    v-for="(allotment, idx) in center.allotment"
                    v-slot="{ hover }"
                    :key="idx"
                    open-delay="200"
                  >
                    <v-card
                      :elevation="hover ? 16 : 2"
                      :class="{ 'on-hover': hover }"
                      flat
                      class="mx-auto my-2"
                      width="70vw"
                      @click="stepperRate(allotment.type)"
                    >
                      <v-card-subtitle class>
                        {{ center.allotment[idx].name }}
                      </v-card-subtitle>
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
      </v-container>
    </v-col>
    <v-col v-else>
      <v-card elevation="0" width="90%" class="mx-auto">
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
                      class="title"
                    >
                      Select your desk
                      <small class="subtitle-2">These are our current allotments</small>
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
                            <v-divider />
                          </v-card>
                        </v-hover>
                      </v-card-text>
                    </v-stepper-content>

                    <v-stepper-step
                      :complete="e6 > 2"
                      step="2"
                      class="title"
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
                      class="title"
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
    </v-col>
  </v-row>
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
