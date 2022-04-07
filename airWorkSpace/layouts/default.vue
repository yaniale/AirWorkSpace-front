<template>
  <v-app>
    <v-app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      color="teal lighten-2"
      app
      fixed
      dark
    >
      <v-toolbar-title class="my-auto" @click="clearState" v-text="title" />
      <v-spacer />
      <SearchBar v-if="$route.name === 'index'" class="my-auto" />
      <v-spacer />
      <v-btn
        color="transparent"
        depressed
        rounded
        class="mr-5"
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-list-item>
          <v-list-item-content>
            <v-icon>
              mdi-menu
            </v-icon>
          </v-list-item-content>
          <v-list-item-avatar>
            <img :src="$auth.$state.user.avatar" alt="">
          </v-list-item-avatar>
        </v-list-item>
      </v-btn>
    </v-app-bar>
    <v-app-bar
      v-if="!$vuetify.breakpoint.mdAndUp && $route.name=== 'index'"
      app
      color="teal lighten-2"
      dark
      shrink-on-scroll
      prominent
      fade-img-on-scroll
      scroll-threshold="100"
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        />
      </template>
      <SearchBar class="my-auto" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
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
      color=""
      fixed
      app
    >
      <v-btn v-if="$store.state.userView" @click="clearState">
        <span class="teal--text">Search</span>

        <v-icon color="teal lighten-2">
          mdi-magnify
        </v-icon>
      </v-btn>

      <v-btn v-else @click="clearState">
        <span class="teal--text">Home</span>

        <v-icon color="teal lighten-2">
          mdi-home-outline
        </v-icon>
      </v-btn>

      <v-btn v-if="$store.state.userView" to="/profile/bookings">
        <span class="teal--text">Bookings</span>

        <v-icon color="teal lighten-2">
          mdi-book-marker-outline
        </v-icon>
      </v-btn>

      <v-btn v-else to="/profile/host/center">
        <span class="teal--text">My Centers</span>

        <v-icon color="teal lighten-2">
          mdi-office-building-outline
        </v-icon>
      </v-btn>

      <v-btn v-if="$store.state.userView" to="/profile/favourites">
        <span class="teal--text">Favorites</span>

        <v-icon color="teal lighten-2">
          mdi-heart-outline
        </v-icon>
      </v-btn>

      <v-btn v-else>
        <span class="teal--text">Notifications</span>

        <v-icon color="teal lighten-2">
          mdi-bell-outline
        </v-icon>
      </v-btn>

      <v-btn
        v-if="!$auth.$state.loggedIn"
        to="/auth"
      >
        <span class="teal--text">Login</span>

        <v-icon color="teal lighten-2">
          mdi-account-outline
        </v-icon>
      </v-btn>

      <v-btn
        v-else
        to="/profile"
      >
        <span class="teal--text">Profile</span>

        <v-icon color="teal lighten-2">
          mdi-account-circle-outline
        </v-icon>
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
