<template>
  <v-card elevation="5">
    <v-card-title />
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          color="purple darken-2"
          label="Email"
          type="email"
          prepend-icon="mdi-email"
          :rules="emailValidator()"
          required
        />
        <v-text-field
          v-model="password"
          :type="passVisible ? 'text' : 'password'"
          color="purple darken-2"
          label="Password"
          prepend-icon="mdi-lock-outline"
          required
          :append-icon="
            passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @click:append="passVisible = !passVisible"
        />
        <v-row>
          <v-col class="text-right">
            <v-btn
              @click="login"
            >
              Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card />
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      passVisible: false
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
      const data = { email: this.email, password: this.password }
      await this.$store.dispatch('login', data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
