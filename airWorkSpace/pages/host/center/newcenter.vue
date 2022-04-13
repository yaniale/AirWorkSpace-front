<template>
  <v-row>
    <v-col>
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
        email: ''
      },
      centerType: ['Coworking', 'Shared Office', 'Business Center', 'Business center & Coworking'],
      errorHandling: {
        compulsoryFields: [false, 'Please, fill in all compulsory fields.']
      }

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
    // const geocoder = new window.google.maps.Geocoder()

    window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
      const place = autocomplete.getPlace()
      console.log(place)
      if (place.address_components) {
        const postalCode = place.address_components.find(e => e.types.includes('postal_code')).long_name
        const address1 = place.address_components.find(e => e.types.includes('route')).long_name
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
