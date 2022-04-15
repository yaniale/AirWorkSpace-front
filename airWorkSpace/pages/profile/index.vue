<template>
  <v-row align="center">
    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3" offset="2">
      <v-row style="height:150px" />
      <v-avatar
        size="200"
        justify="center"
      >
        <v-img alt="avatar" :src="$auth.$state.user.avatar" />
      </v-avatar>
    </v-col>
    <v-col cols="12" sm="8" md="5">
      <v-row style="height:150px" />

      <v-card flat>
        <v-card-title>
          <v-avatar v-if="$vuetify.breakpoint.smAndDown" size="56">
            <v-img alt="avatar" :src="$auth.$state.user.avatar" />
          </v-avatar>
          <v-card-title class="font-weight-black">
            Hello, i'm {{ $auth.$state.user.firstName }}
          </v-card-title>
        </v-card-title>
        <v-card-text>
          <v-input class="mx-2">
            User since {{ $store.state.monthShortName[new Date($auth.$state.user.created).getMonth()] }}
            {{ new Date($auth.$state.user.created).getFullYear() }}
          </v-input>
          <v-divider />
          <v-input v-if="$auth.$state.user.role === 'user'" class="my-2">
            <span>Become a host today and start earning!</span>
            <v-btn @click="promoteHost">
              <v-icon>mdi-arrow-up-thick</v-icon>
              Upgrade
            </v-btn>
          </v-input>
          <v-input v-if="$auth.$state.user.role==='host'">
            <v-icon class="my-2 mr-2">
              mdi-account-switch-outline
            </v-icon>
            <span>Switch to <a @click="switchView">{{ currentView }}</a> view </span>
          </v-input>
          <v-divider />
          <v-input>
            <v-icon class="mr-2">
              mdi-home
            </v-icon>
            Lives in {{ $auth.$state.user.city }}, {{ $auth.$state.user.country }}
          </v-input>
          <v-input v-if="$auth.$state.user.role === 'host'">
            <v-icon class="mr-2">
              mdi-office-building-outline
            </v-icon>
            Owner of {{ centers }} centers
          </v-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn to="/profile/update">
            <v-icon>mdi-pencil-outline</v-icon>
            Edit
          </v-btn>
          <v-btn @click.prevent="logout">
            <v-icon>mdi-account-arrow-right-outline</v-icon>
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      currentView: this.$store.state.userView ? 'host' : 'user',
      centers: ''
    }
  },
  mounted () {
    this.getMyCenters()
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$store.commit('checkHost', 'user')
    },
    async promoteHost () {
      await this.$axios.put('/user/profile', { role: 'host' })
      await this.$auth.fetchUser()
    },
    switchView () {
      this.$store.commit('checkHost', this.currentView)
      this.currentView = this.currentView === 'user' ? 'host' : 'user'
    },
    async getMyCenters () {
      const myCenters = await this.$axios.get(`/center?owner=${this.$auth.$state.user._id}`)
      this.centers = myCenters.data.length
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
