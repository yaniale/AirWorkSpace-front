<template>
  <v-app>
    <v-app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      color="primary"
      app
      fixed
      dark
    >
      <img src="@/assets/logoblanco.png" height="45px" alt="logo" @click="clearState">
      <v-toolbar-title class="my-auto" @click="clearState" v-text="title" />
      <v-spacer />
      <SearchBar v-if="$route.name === 'index' && $store.state.centers.length !== 0" class="my-auto" />
      <v-spacer />
      <v-menu
        rounded="b-xl"
        offset-y
      >
        <template #activator="{ attrs, on }">
          <v-btn
            color="transparent"
            rounded
            text
            class="mr-5"
            v-bind="attrs"
            v-on="on"
          >
            <v-list-item>
              <v-list-item-content>
                <v-icon>
                  mdi-menu
                </v-icon>
              </v-list-item-content>
              <v-list-item-avatar v-if="$auth.$state.user" color="grey">
                <img :src="$auth.$state.user.avatar" alt="">
              </v-list-item-avatar>
            </v-list-item>
          </v-btn>
        </template>

        <v-card
          width="270"
        >
          <v-list v-if="$auth.$state.user" nav>
            <v-list-item>
              <v-list-item-avatar tile>
                <v-img :src="$auth.$state.user.avatar" />
              </v-list-item-avatar>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ $auth.$state.user.firstName }} {{ $auth.$state.user.lastName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ $auth.$state.user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list>
            <v-card v-if="!$auth.$state.user" elevation="0">
              <v-list>
                <v-list-item v-for="[prop, route] in menus.notLogged" :key="prop" :to="route">
                  {{ prop }}
                </v-list-item>
              </v-list>
            </v-card>
            <v-card v-if="$auth.$state.user" elevation="0">
              <v-list v-if="$auth.$state.user.host==='user'">
                <v-card-subtitle>User options</v-card-subtitle>
                <v-list-item v-for="[prop, route] in menus.user" :key="prop" :to="route">
                  {{ prop }}
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-card-subtitle dark class="primary">
                  <v-col>
                    <v-row>
                      <strong>
                        User Options <v-icon>mdi-chevron-right</v-icon>
                      </strong>
                    </v-row>
                  </v-col>
                </v-card-subtitle>
                <v-list-item v-for="[prop, route] in menus.user" :key="prop" :to="route">
                  {{ prop }}
                </v-list-item>
                <v-divider />
                <v-card-subtitle dark class="primary">
                  <v-col>
                    <v-row>
                      <strong>
                        Host Options <v-icon>mdi-chevron-right</v-icon>
                      </strong>
                    </v-row>
                  </v-col>
                </v-card-subtitle>
                <v-list-item v-for="[prop, route] in menus.host" :key="prop" :to="route">
                  {{ prop }}
                </v-list-item>
              </v-list>
              <v-list v-if="$auth.$state.user">
                <v-list-item @click="$auth.logout()">
                  LogOut
                </v-list-item>
              </v-list>
            </v-card>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-app-bar
      v-if="!$vuetify.breakpoint.mdAndUp && $route.name=== 'index'"
      app
      color="primary"
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
      <SearchBar class="ma-auto" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.smAndDown"
      fixed
      app
    >
      <v-btn v-if="$store.state.userView" @click="clearState">
        <span class="teal--text">Search</span>

        <v-icon color="primary">
          mdi-magnify
        </v-icon>
      </v-btn>

      <v-btn v-else @click="clearState">
        <span class="teal--text">Home</span>

        <v-icon color="primary">
          mdi-home-outline
        </v-icon>
      </v-btn>

      <v-btn v-if="$store.state.userView" to="/profile/bookings">
        <span class="teal--text">Bookings</span>

        <v-icon color="primary">
          mdi-book-marker-outline
        </v-icon>
      </v-btn>

      <v-btn v-else to="/host/center">
        <span class="teal--text">My Centers</span>

        <v-icon color="primary">
          mdi-office-building-outline
        </v-icon>
      </v-btn>

      <v-fab-transition v-if="$store.state.userView === false && $route.name === 'host-center'" class="mx-0 px-0">
        <v-btn
          class="mx-0 px-0"
          to="/host/center/newcenter"
          color="primary"
          absolute
          top
          fab
          style="border-radius:50px;"
          elevation="2"
        >
          <v-icon class="mx-0 px-0 text-h6" color="white">
            mdi-plus
          </v-icon>
        </v-btn>
      </v-fab-transition>

      <v-btn v-if="$store.state.userView" to="/profile/favourites">
        <span class="teal--text">Favorites</span>

        <v-icon color="primary">
          mdi-heart-outline
        </v-icon>
      </v-btn>

      <v-btn v-else to="/host/messages">
        <span class="teal--text">Notifications</span>

        <v-icon color="primary">
          mdi-bell-outline
        </v-icon>
      </v-btn>

      <v-btn
        v-if="!$auth.$state.loggedIn"
        to="/auth"
      >
        <span class="teal--text">Login</span>

        <v-icon color="primary">
          mdi-account-outline
        </v-icon>
      </v-btn>

      <v-btn
        v-else
        to="/profile"
      >
        <span class="teal--text">Profile</span>

        <v-icon color="primary">
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer
      v-if="$vuetify.breakpoint.lg"
      :absolute="true"
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
      menus: {
        notLogged: [
          ['SignUp/Login', '/auth']
        ],
        user: [
          ['Profile', '/profile'],
          ['Favourites', '/profile/favourites'],
          ['Bookings', '/profile/bookings']
        ],
        host: [
          ['My Centers', '/host/center'],
          ['Notifications', '/host/messages']
        ]
      },
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

<style lang="scss" scoped>
</style>
