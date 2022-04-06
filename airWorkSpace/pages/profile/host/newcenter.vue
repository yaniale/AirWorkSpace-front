<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title class="justify-left">
          Add a new coworking space
        </v-card-title>
      </v-card>
      <v-form>
        <v-card class="my-2">
          <v-card-title>Basic Info</v-card-title>
          <v-card-text>
            <v-text-field v-model="center.name" label="Center Name" :rules="rules().checkName()" />
            <v-select label="Center Type" dense />
            <v-text-field v-model="center.workingHours" label="Working Hours" hint="pe.: M-F from 8h to 20h" />

            <v-textarea

              label="Description"
            />
          </v-card-text>

          <v-card-title>Location</v-card-title>
          <v-card-text>
            <v-text-field v-model="center.address1" label="Address 1" :rules="rules().checkAddress()" />
            <v-text-field v-model="center.address2" label="Address 2" />
            <v-text-field v-model="center.postalCode" label="Postal Code" :rules="rules().checkPostalCode()" />
            <v-text-field v-model="center.city" label="City" :rules="rules().checkCity()" />
            <v-text-field v-model="center.country" label="Country" :rules="rules().checkCountry()" />
          </v-card-text>

          <v-card-title>Contact details</v-card-title>
          <v-card-text>
            <v-text-field v-model="center.phone" label="Phone" :rules="rules().checkPhone()" />
            <v-text-field v-model="center.mobile" label="Mobile" />
            <v-text-field v-model="center.email" label="Email" type="email" :rules="rules().checkEmail()" />
          </v-card-text>
          <v-card-actions>
            <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text">
              {{ errorHandling.compulsoryFields[1] }}
            </v-card-text>
            <v-spacer />
            <v-btn class="text-capitalize" @click="submitCenter">
              Submit
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
        name: '', // req
        type: '', // req
        description: '', // req,
        photos: '',
        address1: '', // req
        address2: '',
        postalCode: '', // req
        city: '', // req
        country: '', // req
        workingHours: '',
        phone: '', // req
        mobile: '',
        email: ''// req
      },
      errorHandling: {
        compulsoryFields: [false, 'Please, fill in all compulsory fields.']
      }

    }
  },
  methods: {
    async submitCenter () {
      try {
        if (this.$auth.user.role === 'host') {
          if (this.center.name === '' || this.center.address1 === '' || this.center.postalCode === '' || this.center.city === '' || this.center.country === '' || this.center.phone === '' || this.center.email === '') {
            this.$set(this.errorHandling.compulsoryFields, 0, true)
          } else {
            await this.$axios.post('/center/', this.center)
            await this.$auth.fetchUser()
            this.$router.push('/profile/host/center')
          }
        }
      } catch (error) {
        console.log(error)
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
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
