<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card flat>
        <v-card-title class="justify-left">
          Add a new coworking space
        </v-card-title>
      </v-card>
      <v-form>
        <v-card class="my-2" flat>
          <v-card-title>Basic Info</v-card-title>
          <v-card-text>
            <v-text-field v-model="center.name" label="Center Name" :rules="rules().checkName()" />
            <v-select v-model="center.type" label="Center Type" dense :items="centerType" />
            <v-text-field v-model="center.workingHours" label="Working Hours" hint="pe.: M-F from 8h to 20h" />

            <v-textarea
              v-model="center.description"
              rows="2"
              label="Description"
            />
          </v-card-text>

          <v-card-title>Location</v-card-title>
          <v-card-text>
            <v-text-field id="searchTextField" v-model="center.address1" type="text" label="Address 1" :rules="rules().checkAddress()" />
            <v-text-field v-model="center.address2" label="Address 2" />
            <v-text-field v-model="center.postalCode" label="Postal Code" :rules="rules().checkPostalCode()" />
            <v-text-field v-model="center.city" label="City" :rules="rules().checkCity()" />
            <v-text-field v-model="center.country" label="Country" :rules="rules().checkCountry()" />
          </v-card-text>

          <v-card-title>Contact details</v-card-title>
          <v-card-text class="pb-0">
            <v-text-field v-model="center.phone" label="Phone" :rules="rules().checkPhone()" />
            <v-text-field v-model="center.mobile" label="Mobile" />
            <v-text-field v-model="center.email" label="Email" type="email" :rules="rules().checkEmail()" />
          </v-card-text>
          <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text py-0 my-0 caption">
            {{ errorHandling.compulsoryFields[1] }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" class="text-capitalize" @click="submitCenter()">
              Submit & continue
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-col v-else>
      <v-card flat>
        <v-card-title class="font-weight-bold mx-5 headline">
          Add a new coworking space
        </v-card-title>
      </v-card>
      <v-stepper>
        <v-stepper-header>
          <v-stepper-step
            step="1"
            editable
          >
            Basic Info
          </v-stepper-step>

          <v-divider />

          <v-stepper-step
            step="2"
            editable
          >
            Desk types
          </v-stepper-step>

          <v-divider />

          <v-stepper-step
            step="3"
            editable
          >
            Rate Plans
          </v-stepper-step>
          <v-divider />

          <v-stepper-step
            step="4"
            editable
          >
            Services
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-12"
              flat
              height="100%"
            >
              <v-row>
                <v-col>
                  <v-card-title>Basic Info</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="center.name" label="Center Name" :rules="rules().checkName()" />
                    <v-select v-model="center.type" label="Center Type" dense :items="centerType" />
                    <v-text-field v-model="center.workingHours" label="Working Hours" hint="pe.: M-F from 8h to 20h" />

                    <v-textarea
                      v-model="center.description"
                      rows="2"
                      label="Description"
                    />
                  </v-card-text>

                  <v-card-title>Location</v-card-title>
                  <v-card-text>
                    <v-text-field id="searchTextField" v-model="center.address1" type="text" label="Address 1" :rules="rules().checkAddress()" />
                    <v-text-field v-model="center.address2" label="Address 2" />
                    <v-text-field v-model="center.postalCode" label="Postal Code" :rules="rules().checkPostalCode()" />
                    <v-text-field v-model="center.city" label="City" :rules="rules().checkCity()" />
                    <v-text-field v-model="center.country" label="Country" :rules="rules().checkCountry()" />
                  </v-card-text>
                </v-col>
                <v-col>
                  <v-card-title>Contact details</v-card-title>
                  <v-card-text class="pb-0">
                    <v-text-field v-model="center.phone" label="Phone" :rules="rules().checkPhone()" />
                    <v-text-field v-model="center.mobile" label="Mobile" />
                    <v-text-field v-model="center.email" label="Email" type="email" :rules="rules().checkEmail()" />
                  </v-card-text>
                  <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text py-0 my-0 caption">
                    {{ errorHandling.compulsoryFields[1] }}
                  </v-card-text>
                  <v-card-title>Photos</v-card-title>
                  <v-card-text class="pb-0">
                    <v-text-field v-model="center.photos" label="Photo URL" />
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"

                @click="submitCenter()"
              >
                Submit & Continue
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              flat
              class="mb-12"
              height="100%"
            >
              <v-col cols="6" offset="3">
                <v-card-text>
                  <v-text-field v-model="allotment.name" label="Name" />
                  <v-select v-model="allotment.type" label="Select table type" dense :items="tableType" />
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="allotment.quantity" label="Quantity" />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text py-0 my-0 caption">
                  {{ errorHandling.compulsoryFields[1] }}
                </v-card-text>
              </v-col>
            </v-card>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              height="100%"
              flat
            >
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="ratePlan.name" label="Plan Name" />
                    <v-select v-model="ratePlan.appliesTo" dense :items="tableType" label="Select table type" />
                    <v-textarea v-model="ratePlan.description" rows="2" label="Description" />
                    <v-row>
                      <v-col cols="4">
                        <v-text-field v-model="ratePlan.price" label="Price" />
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="ratePlan.discount" label="% Disc." />
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="ratePlan.tax" cols="6" label="Tax" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="5" offset="1">
                    <v-text-field v-model="ratePlan.minBookingTime" label="Min. Booking Time" />
                    <v-text-field v-model="ratePlan.minBookingDays" label="Min. Booking Days" />
                    <!-- Calendario From -->
                    <v-dialog
                      ref="from"
                      v-model="from"
                      :return-value.sync="dateFrom"
                      persistent
                      width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFrom"

                          label="Valid from..."
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="dateFrom"
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          color="primary"
                          @click="from = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.from.save(dateFrom)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                    <!-- Calendario TO -->
                    <v-dialog
                      ref="to"
                      v-model="to"
                      :return-value.sync="dateTo"
                      persistent
                      width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateTo"
                          label="Valid to..."
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="dateTo"
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          color="primary"
                          @click="to = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.to.save(dateTo)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                @click="e1 = 4"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NewCenterPage',
  data () {
    return {
      center: {
        name: '',
        type: '',
        description: '',
        photos: '',
        address1: '',
        address2: '',
        postalCode: '',
        location: {
          lat: '',
          lng: ''
        },
        city: '',
        country: '',
        workingHours: '',
        phone: '',
        mobile: '',
        email: '',
        e1: 1
      },
      centerType: ['Coworking', 'Shared Office', 'Business Center', 'Business center & Coworking'],
      errorHandling: {
        compulsoryFields: [false, 'Please, fill in all compulsory fields.']
      },
      allotment: [],
      tableType: ['Fixed Desk', 'Flex Desk', 'Office', 'Conference Room'],
      ratePlan: {},
      from: false,
      to: false,
      dateFrom: '',
      dateTo: ''
    }
  },
  mounted () {
    const defaultBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(-33.8902, 151.1759),
      new window.google.maps.LatLng(-33.8474, 151.2631))
    const input = document.getElementById('searchTextField')
    const options = {
      bounds: defaultBounds,
      types: ['establishment']
    }
    const autocomplete = new window.google.maps.places.Autocomplete(
      input, options
    )

    window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
      const place = autocomplete.getPlace()
      if (place.address_components) {
        const postalCode = place.address_components.find(e => e.types.includes('postal_code')).long_name
        const address1 = place.address_components.find(e => e.types.includes('street_number')).long_name + ', ' + place.address_components.find(e => e.types.includes('route')).long_name
        const city = place.address_components.find(e => e.types.includes('locality')).long_name
        const country = place.address_components.find(e => e.types.includes('country')).long_name
        const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
        this.setCenterData(address1, postalCode, city, country, location)
      }
    }.bind(this))
  },
  methods: {
    async submitCenter () {
      try {
        if (this.$auth.user.role === 'host') {
          if (this.center.name === '' || this.center.address1 === '' || this.center.postalCode === '' || this.center.city === '' || this.center.country === '' || this.center.phone === '' || this.center.email === '') {
            this.$set(this.errorHandling.compulsoryFields, 0, true)
          } else {
            const center = await this.$axios.post('/center/', this.center)
            this.$router.push({ path: `/host/center/${center.data.data._id}`, component: 'AllotmentPage' })
            console.log(center)
            await this.$auth.fetchUser()
          }
        }
      } catch (error) {
        return error
      }
    },
    rules () {
      const self = this
      return {
        checkName () {
          if (self.center.name.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkDescription () {
          if (self.center.description.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkAddress () {
          if (self.center.address1.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkPostalCode () {
          if (self.center.postalCode.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkCity () {
          if (self.center.city.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkCountry () {
          if (self.center.country.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkPhone () {
          if (self.center.phone.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        checkEmail () {
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(self.center.email)) {
            return [true]
          } else {
            return ['Wrong email format']
          }
        }

      }
    },
    setCenterData (address1, postalCode, city, country, location) {
      this.center.address1 = address1
      this.center.postalCode = postalCode
      this.center.city = city
      this.center.country = country
      this.center.location = location
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
