<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="$auth.$state.user.favourites.length === 0">
        <v-card-text>You don't have any favourite yet.</v-card-text>
      </v-card>
      <v-card
        v-for="(center, idx) in $auth.$state.user.favourites"
        :key="idx"
        class="mx-auto my-2"
        max-width="344"
      >
        <v-img
          :src="center.photos[0]"
          height="200px"
          @click="getCenter(center._id)"
        />

        <v-card-title @click="getCenter(center._id)">
          {{ center.name }}
        </v-card-title>

        <v-card-subtitle>
          {{ center.city }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            color="orange lighten-2"
            text
          >
            <v-icon @click.prevent="addFavourite(center._id)">
              {{ isFavourite(center._id) ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>

          <v-spacer />

          <v-btn
            icon
            @click="updateShow(idx)"
          >
            {{ showDescription[idx] ? 'Menos': 'Más' }}
            <v-icon>{{ showDescription[idx] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="showDescription[idx]">
            <v-divider />

            <v-card-text>
              {{ center.description }}
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FavouritesPage',
  middleware: 'auth',
  data () {
    return {
      showDescription: [],
      data: {}
    }
  },
  methods: {
    isFavourite (id) {
      if (this.$auth.state.user) {
        return !!this.$auth.state.user.favourites.find(e => e._id === id)
      } else {
        return false
      }
    },
    updateShow (idx) {
      const boolean = !this.showDescription[idx]
      this.$set(this.showDescription, idx, boolean)
    },
    async addFavourite (id) {
      if (!this.$auth.loggedIn) {
        this.$router.push('/login')
      } else {
        await this.$axios.put(`/user/profile/favourites/${id}`)
        await this.$auth.fetchUser()
      }
    },
    async getCenter (id) {
      this.data = await this.$axios.get(`/center/${id}`)
      const load = [this.data.data]
      this.$store.commit('addCenters', load)
      this.$router.push({ path: '/center/', query: { id }, component: 'CenterPage' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
