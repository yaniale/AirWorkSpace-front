<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp" v-text="title" />
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
      <SearchBar />
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon v-if="$vuetify.breakpoint.mdAndUp">
          mdi-menu
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-card-text v-if="$store.state.userView=== false" style="height: 100px; position: relative">
      <v-fab-transition>
        <v-btn
          to="/profile/host/newcenter"
          color="teal lighten-2"
          dark
          absolute
          top
          right
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.xs"
      fixed
      app
    >
      <v-btn v-if="$store.state.userView" @click="clearState">
        <span>Search</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn v-else @click="clearState">
        <span>Home</span>

        <v-icon>mdi-home-outline</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.userView" to="/profile/bookings">
        <span>Bookings</span>

        <v-icon>mdi-book-marker-outline</v-icon>
      </v-btn>

      <v-btn v-else to="/profile/host/center">
        <span>My Centers</span>

        <v-icon>mdi-office-building-outline</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.userView" to="/profile/favourites">
        <span>Favorites</span>

        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn v-else to="/profile/host/center">
        <span>Notifications</span>

        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <v-btn
        v-if="!$auth.$state.loggedIn"
        to="/auth"
      >
        <span>Login</span>

        <v-icon>mdi-account-outline</v-icon>
      </v-btn>

      <v-btn
        v-else
        to="/profile"
      >
        <span>Profile</span>

        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer
      v-if="$vuetify.breakpoint.lg"
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AirWorkSpace'
    }
  },
  methods: {
    clearState () {
      this.$store.commit('clearState')
      this.$router.push('/')
    }
  }
}
</script>
