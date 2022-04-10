<template>
  <v-card elevation="5">
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
      <v-spacer />
      <v-btn
        @click.prevent="login"
      >
        Login
      </v-btn>
    </v-card-actions>
    <v-spacer />
    <v-input class="mx-2">
      Not a member?
      <v-btn v-if="$vuetify.breakpoint.smAndDown" depressed color="transparent" to="/auth/signup" class="text-capitalize primary--text">
        Register now!
      </v-btn>
      <sign-up />
    </v-input>
    <v-card />
  </v-card>
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

</style>
