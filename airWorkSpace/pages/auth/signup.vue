<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title class="justify-center">
          Become an AirWorker!
        </v-card-title>
      </v-card>
      <v-form>
        <v-card class="my-2" elevation="5">
          <v-card-title>Basic Info</v-card-title>
          <v-card-text>
            <v-text-field v-model="user.firstName" color="teal lighten-2" class="mx-2" label="First Name" :rules="rules().compFirstName()" />
            <v-text-field v-model="user.lastName" color="teal lighten-2" class="mx-2" label="Last Name" :rules="rules().compLastName()" />
            <v-text-field v-model="user.phone" color="teal lighten-2" class="mx-2" label="Phone" :rules="rules().compPhone()" />
          </v-card-text>
        </v-card>
        <v-card class="my-2" elevation="5">
          <v-card-title>
            Address
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="user.address" color="teal lighten-2" label="Address" />
            <v-text-field v-model="user.postalCode" color="teal lighten-2" label="Postal Code" />
            <v-text-field v-model="user.city" color="teal lighten-2" label="City" />
            <v-text-field v-model="user.state" color="teal lighten-2" label="State/Province" />
            <v-text-field v-model="user.country" color="teal lighten-2" label="Country" />
          </v-card-text>
        </v-card>
        <v-card class="my-2" elevation="5">
          <v-card-title>Login details</v-card-title>
          <v-card-text>
            <v-text-field v-model="user.email" color="teal lighten-2" type="email" label="Email" :rules="rules().emailValidator()" />
            <v-text-field v-model="user.confirmEmail" color="teal lighten-2" type="email" label="Confirm email" :rules="rules().emailValidator()" />
            <v-text-field v-model="user.password" color="teal lighten-2" type="password" label="Password" :rules="rules().passwordValidator()" />
            <v-text-field v-model="user.confirmPassword" color="teal lighten-2" type="password" label="Confirm password" :rules="rules().passwordValidator()" />
          </v-card-text>
        </v-card>
        <v-card flat>
          <v-card-actions>
            <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text">
              {{ errorHandling.compulsoryFields[1] }}
            </v-card-text>
            <v-spacer />
            <v-btn @click="signUp">
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SignUpPage',
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
      }
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
        console.log(error)
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
