<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-row class="border">
        <v-card width="100%" flat>
          <v-card-title class="justify-center">
            Log in or Sign up
          </v-card-title>
        </v-card>
      </v-row>
      <v-card width="100%" flat class="mt-10">
        <v-card-title class="headline justify-center mb-5">
          <img src="@/assets/logo3.png" height="120px" alt="logo">
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-input>
              <v-text-field
                v-model="email"
                color="primary"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                :rules="emailValidator()"
                required
              />
            </v-input>
            <v-input :messages="errorMessage">
              <v-text-field
                v-model="password"
                :type="passVisible ? 'text' : 'password'"
                color="primary"
                label="Password"
                prepend-icon="mdi-lock-outline"
                required
                :append-icon="
                  passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append="passVisible = !passVisible"
              />
            </v-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            width="100%"
            color="primary"
            @click.prevent="login"
          >
            Login
          </v-btn>
        </v-card-actions>
        <v-input class="mx-2">
          Still not a member?
          <v-btn v-if="$vuetify.breakpoint.smAndDown" depressed color="transparent" to="/auth/signup" class="text-capitalize primary--text">
            Join now!
          </v-btn>
          <sign-up />
        </v-input>
      </v-card>
    </v-col>
    <!-- breakpoint mdAndUp -->
    <v-col v-else>
      <v-row>
        <v-col cols="5" offset="1" class="pa-0">
          <v-card style="display:flex" height="100vh" flat>
            <img src="@/assets/logo3.png" height="250px" class="ma-auto" alt="logo">
          </v-card>
        </v-col>

        <v-col>
          <v-container style="display:flex; height:100%;">
            <v-card elevation="5" style="margin:auto" class="rounded-xl">
              <v-card-title class="justify-center">
                Log in or Sign up
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-input class="mx-5">
                    <v-text-field
                      v-model="email"
                      color="primary"
                      label="Email"
                      type="email"
                      prepend-icon="mdi-email"
                      :rules="emailValidator()"
                      required
                    />
                  </v-input>
                  <v-input class="mx-5" :messages="errorMessage">
                    <v-text-field
                      v-model="password"
                      :type="passVisible ? 'text' : 'password'"
                      color="primary"
                      label="Password"
                      prepend-icon="mdi-lock-outline"
                      required
                      :append-icon="
                        passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      @click:append="passVisible = !passVisible"
                    />
                  </v-input>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  width="70%"
                  color="primary"
                  @click.prevent="login"
                >
                  Login
                </v-btn>
              </v-card-actions>
              <v-input class="mx-16 px-8 pt-2">
                Still not a member?
                <v-btn v-if="$vuetify.breakpoint.smAndDown" depressed color="transparent" to="/auth/signup" class="text-capitalize primary--text">
                  Join now!
                </v-btn>
                <sign-up />
              </v-input>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import signUp from '@/components/signUp.vue'

export default {
  components: {
    signUp
  },
  data () {
    return {
      email: '',
      password: '',
      passVisible: false,
      errorMessage: ''
    }
  },
  methods: {
    emailValidator () {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return [true]
      }
      return ['Wrong email']
    },
    async login () {
      try {
        const { data } = await this.$auth.loginWith('local', { data: { email: this.email, password: this.password } })
        this.$store.commit('checkHost', this.$auth.$state.user.role)
        return data
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 1px solid grey
}
.bg{
  background-image: url(../assets/logo_size.jpg);
}
</style>
