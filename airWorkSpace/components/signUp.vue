<template>
  <v-row v-if="$vuetify.breakpoint.mdAndUp">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          depressed
          color="transparent"
          class="text-capitalize primary--text"
          v-bind="attrs"
          v-on="on"
        >
          Join now!
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <v-card-title class="pt-2 pb-0 px-0">
              Basic Info
            </v-card-title>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="user.firstName" class="mx-2" label="First Name*" :rules="rules().compFirstName()" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="user.lastName" class="mx-2" label="Last Name*" :rules="rules().compLastName()" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="user.phone" class="mx-2" label="Phone*" :rules="rules().compPhone()" />
              </v-col>
              <v-col cols="12" class="my-0 py-0">
                <v-card-title class="pa-0">
                  Address
                </v-card-title>
              </v-col>
              <v-col cols="12" sm="10" md="9">
                <v-text-field v-model="user.address" label="Address" />
              </v-col>
              <v-col
                cols="12"
                sm="5"
                md="3"
              >
                <v-text-field v-model="user.postalCode" label="Postal Code" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="user.city" label="City" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="user.state" label="State/Province" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field v-model="user.state" label="Country" />
              </v-col>
              <v-col cols="12" class="my-0 py-0">
                <v-card-title class="pa-0">
                  Login Details
                </v-card-title>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="user.email" type="email" label="Email*" :rules="rules().emailValidator()" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="user.confirmEmail" type="email" label="Confirm email*" :rules="rules().emailValidator()" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="user.password" type="password" label="Password*" :rules="rules().passwordValidator()" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field v-model="user.confirmPassword" type="password" label="Confirm password*" :rules="rules().passwordValidator()" />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text py-0 my-0 caption">
            {{ errorHandling.compulsoryFields[1] }}
          </v-card-text>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="signUp"
          >
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      user: {
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        state: '',
        phone: '',
        taxCode: ''
      },
      errorHandling: {
        compulsoryFields: [false, 'Please, fill in all compulsory fields.']
      },
      dialog: false
    }
  },
  methods: {
    async signUp () {
      const checkEmail = this.rules().emailValidator()[0] === true && this.user.confirmEmail !== ''
      const checkPassword = this.rules().passwordValidator()[0] === true && this.user.confirmPassword !== ''
      const data = {}

      try {
        if (this.user.firstName === '' || this.user.lastName === '' || this.user.phone === '' || !checkEmail || !checkPassword) {
          this.$set(this.errorHandling.compulsoryFields, 0, true)
        } else {
          data.email = this.user.confirmEmail
          data.password = this.user.confirmPassword
          await this.$axios.post('/auth/signup', this.user)
          await this.$auth.loginWith('local', { data: { email: this.user.email, password: data.password } })
          this.$router.push('/')
        }
      } catch (error) {
        return error
      }
    },
    rules () {
      const self = this
      return {
        emailValidator () {
          if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(self.user.email)) {
            if (self.user.email === self.user.confirmEmail || self.user.confirmEmail === '') {
              return [true]
            } else {
              return ['Emails don\'t match']
            }
          }
          return ['Wrong email']
        },
        passwordValidator () {
          if (self.user.password > 0 && self.user.password === self.user.confirmPassword) {
            return [true]
          } else {
            return ["Passwords don't match"]
          }
        },
        compFirstName () {
          if (self.user.firstName.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        compLastName () {
          if (self.user.lastName.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        },
        compPhone () {
          if (self.user.phone.length > 0) {
            return [true]
          } else {
            return ['*']
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
