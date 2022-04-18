<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card elevation="0">
        <v-card-title>Update profile</v-card-title>
        <v-card-text>
          <v-form>
            <v-divider class="my-2" />
            <v-card class="my-5" flat>
              <v-card-title class="px-2 py-0">
                Basic Info
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="user.avatar" color="primary" class="mx-2" label="Profile Picture URL" />
                <v-text-field v-model="user.firstName" color="primary" class="mx-2" label="First Name" />
                <v-text-field v-model="user.lastName" color="primary" class="mx-2" label="Last Name" />
              </v-card-text>

              <v-card-title class="px-2 py-0">
                Address
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="user.address" color="primary" label="Address" />
                <v-text-field v-model="user.postalCode" color="primary" label="Postal Code" />
                <v-text-field v-model="user.city" color="primary" label="City" />
                <v-text-field v-model="user.state" color="primary" label="State/Province" />
                <v-text-field v-model="user.country" color="primary" label="Country" />
              </v-card-text>
              <v-card-actions>
                <span v-if="messageHandling.updated[0]" class="green--text">{{ messageHandling.updated[1] }}</span>
                <v-spacer />
                <v-btn color="primary" @click="updateProfile">
                  Update Profile
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-card class="my-5" flat>
              <v-card-title class="px-2 py-0">
                Login Details
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="user.email" color="primary" label="Email" :rules="rules().emailValidator()" />
                <v-text-field v-model="user.confirmEmail" color="primary" label="Confirm Email" :rules="rules().emailValidator()" />
                <v-text-field v-model="user.password" color="primary" label="Password" type="password" :rules="rules().passwordValidator()" />
                <v-text-field v-model="user.confirmPassword" color="primary" label="Confirm Password" type="password" :rules="rules().passwordValidator()" />
              </v-card-text>
              <v-card-actions>
                <span v-if="errorHandling.noUpdateProfile[0]" class="red--text">{{ errorHandling.noUpdateProfile[1] }}</span>
                <v-spacer />
                <v-btn color="primary" @click="updateLogin">
                  Update Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else cols="10" offset="1">
      <v-card flat>
        <v-card-title>Update profile</v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="7" class="mr-5">
                <v-card class="my-5" flat>
                  <v-card-title class="px-2 py-0">
                    Basic Info
                  </v-card-title>
                  <v-card-text class="py-0">
                    <v-text-field v-model="user.avatar" color="primary" class="mx-2" label="Profile Picture URL" />
                    <v-row>
                      <v-col>
                        <v-text-field v-model="user.firstName" color="primary" class="mx-2" label="First Name" />
                      </v-col>
                      <v-col>
                        <v-text-field v-model="user.lastName" color="primary" class="mx-2" label="Last Name" />
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-title class="px-2 py-0">
                    Address
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <v-text-field v-model="user.address" color="primary" label="Address" />
                    <v-row>
                      <v-col cols="6">
                        <v-text-field v-model="user.postalCode" color="primary" label="Postal Code" width="10%" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="user.city" color="primary" label="City" />
                      </v-col>
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols="6" class="pt-0">
                        <v-text-field v-model="user.state" color="primary" label="State/Province" />
                      </v-col>
                      <v-col cols="6" class="pt-0">
                        <v-text-field v-model="user.country" color="primary" label="Country" />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card-actions class="pt-0">
                  <span v-if="messageHandling.updated[0]" class="success--text mx-5">{{ messageHandling.updated[1] }}</span>
                  <v-spacer />
                  <v-btn color="primary" @click="updateProfile">
                    Update Profile
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col class="ml-5">
                <v-card class="my-5" flat>
                  <v-card-title class="px-2 py-0">
                    Login Details
                  </v-card-title>
                  <v-card-text>
                    <v-text-field v-model="user.email" color="primary" label="Email" :rules="rules().emailValidator()" />
                    <v-text-field v-model="user.confirmEmail" color="primary" label="Confirm Email" :rules="rules().emailValidator()" />
                    <v-text-field v-model="user.password" color="primary" label="Password" type="password" :rules="rules().passwordValidator()" />
                    <v-text-field v-model="user.confirmPassword" color="primary" label="Confirm Password" type="password" :rules="rules().passwordValidator()" />
                  </v-card-text>
                  <v-card-actions class="mt-15 pt-12">
                    <span v-if="errorHandling.noUpdateProfile[0]" class="red--text">{{ errorHandling.noUpdateProfile[1] }}</span>
                    <v-spacer />
                    <v-btn color="primary" @click="updateLogin">
                      Update Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
          <v-divider />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UpdateProfile',
  data () {
    return {
      user: {
        avatar: this.$auth.$state.user.avatar,
        firstName: this.$auth.$state.user.firstName,
        lastName: this.$auth.$state.user.lastName,
        email: this.$auth.$state.user.email,
        confirmEmail: '',
        password: this.$auth.$state.user.password,
        confirmPassword: '',
        address: this.$auth.$state.user.address,
        city: this.$auth.$state.user.city,
        country: this.$auth.$state.user.country,
        postalCode: this.$auth.$state.user.postalCode,
        state: this.$auth.$state.user.state,
        phone: this.$auth.$state.user.phone,
        taxCode: this.$auth.$state.user.taxCode
      },
      errorHandling: {
        noUpdateProfile: [false, 'Nothing to change or wrong inputs']
      },
      messageHandling: {
        updated: [false, 'Profile has been updated']
      }
    }
  },
  methods: {
    async updateProfile () {
      const data = {
        avatar: this.user.avatar,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        address: this.user.address,
        city: this.user.city,
        country: this.user.country,
        postalCode: this.user.postalCode,
        state: this.user.state,
        phone: this.user.phone,
        taxCode: this.user.taxCode
      }

      try {
        await this.$axios.put('/user/profile', data)
        this.$set(this.messageHandling.updated, 0, true)
      } catch (error) {
        return false
      }
    },
    async updateLogin () {
      const checkEmailUpdated = this.rules().emailValidator()[0] === true && this.user.confirmEmail !== ''
      const checkPasswordUpdate = this.rules().passwordValidator()[0] === true && this.user.confirmPassword !== ''
      const data = {}
      try {
        if (checkEmailUpdated && checkPasswordUpdate) {
          data.email = this.user.confirmEmail
          data.password = this.user.confirmPassword
          await this.$axios.put('/user/profile', data)
          await this.$auth.loginWith('local', { data: { email: data.email, password: data.password } })
        } else if (checkEmailUpdated && this.user.confirmPassword === '') {
          data.email = this.user.confirmEmail
          await this.$axios.put('/user/profile', data)
          await this.$auth.loginWith('local', { data: { email: data.email, password: this.user.password } })
        } else if (checkPasswordUpdate && this.user.confirmEmail === '') {
          data.password = this.user.confirmPassword
          await this.$axios.put('/user/profile', data)
          await this.$auth.loginWith('local', { data: { email: this.user.email, password: data.password } })
        } else {
          this.$set(this.errorHandling.noUpdateProfile, 0, true)
          return false
        }
      } catch (error) {
        return false
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
          if (self.user.password === self.user.confirmPassword || self.user.confirmPassword === '') {
            return [true]
          } else {
            return ["Passwords don't match"]
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.colstyle {
  border-left:dotted 1px grey
}
</style>
