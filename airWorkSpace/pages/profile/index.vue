<template>
  <v-row align="center">
    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3" offset="2">
      <v-card height="500">
        <v-avatar
          size="200"
          justify="center"
        >
          <v-img alt="avatar" :src="$auth.$state.user.avatar" />
        </v-avatar>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="5">
      <v-card>
        <v-card-title>
          <v-avatar v-if="$vuetify.breakpoint.smAndDown" size="56">
            <v-img alt="avatar" :src="$auth.$state.user.avatar" />
          </v-avatar>
          <span class="ml-5">
            Hello, i'm {{ $auth.$state.user.firstName }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="mx-2">
            User since {{ $store.state.monthShortName[new Date($auth.$state.user.created).getMonth()] }}
            {{ new Date($auth.$state.user.created).getFullYear() }}
          </div>
          <v-divider />
          <div v-if="$auth.$state.user.role === 'user'" class="my-2">
            <span>Become a host today and start earning!</span>
            <v-btn @click="promoteHost">
              <v-icon>mdi-arrow-up-thick</v-icon>
              Upgrade
            </v-btn>
          </div>
          <div v-if="$auth.$state.user.role==='host'" class="my-2">
            <span>Switch to <a @click="switchView">{{ currentView }}</a> view </span>
          </div>
          <v-divider />
          Lives in {{ $auth.$state.user.city }}, {{ $auth.$state.user.country }}
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
      currentView: this.$store.state.userView ? 'host' : 'user'
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
