<template>
  <v-row>
    <v-col v-if="$vuetify.breakpoint.smAndDown">
      <v-card-title class="font-weight-bold mx-5 headline">
        Favourites
      </v-card-title>
      <v-card v-if="$auth.$state.user.favourites.length === 0" flat>
        <v-card-text>You don't have any favourite yet.</v-card-text>
      </v-card>
      <v-card
        v-for="(center, idx) in $auth.$state.user.favourites"
        :key="idx"
        class="mx-auto my-2 rounded-xl"
        width="90%"
        elevation="0"
      >
        <v-img
          :src="center.photos[0]"
          height="200px"
          @click="getCenter(center._id)"
        />

        <v-card-title class="font-weight-bold" @click="getCenter(center._id)">
          {{ center.name }}
        </v-card-title>

        <v-card-subtitle>
          {{ center.city }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn
            color="red lighten-2"
            text
          >
            <v-icon @click.prevent="addFavourite(center._id)">
              {{ isFavourite(center._id) ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>

          <v-spacer />

          <v-btn
            class="mx-4"
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
    <v-col v-else>
      <v-card-title class="font-weight-bold mx-5 headline">
        Favourites
      </v-card-title>
      <v-card v-if="$auth.$state.user.favourites.length === 0" flat>
        <v-card-text class="headline">
          You don't have any favourite yet.
        </v-card-text>
      </v-card>
      <v-card
        v-for="(center, idx) in $auth.$state.user.favourites"
        :key="idx"
        class="mx-auto my-2"
        width="90%"
        elevation="0"
      >
        <v-list-item>
          <v-list-item-avatar
            tile
            size="300"
            color="grey"
            class="rounded-xl mx-10"
          >
            <v-img
              :src="center.photos[0]"
              cover
              @click="getCenter(center._id)"
            />
          </v-list-item-avatar>
          <v-list-item-content style="height:300px">
            <v-list-item-title class="headline font-weight-bold" @click="getCenter(center._id)">
              {{ center.name }}
            </v-list-item-title>
            <v-list-item-title class="title">
              <v-chip outlined>
                {{ center.type }}
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle text-wrap">
              <v-icon>mdi-map-marker-outline</v-icon>
              {{ center.address1 }} {{ center.address2 ? ` - ${center.address2} - ` : '' }} , {{ center.postalCode }} {{ center.city }} , {{ center.country }}
            </v-list-item-subtitle>
            <div>
              <v-icon>mdi-text</v-icon> {{ center.description }}
            </div>
            <v-list-item-action>
              <v-spacer />
              <v-btn
                color="red lighten-2"
                text
                class="mr-10"
              >
                <v-icon @click.prevent="addFavourite(center._id)">
                  {{ isFavourite(center._id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
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
      if (this.$auth.$state.user) {
        return !!this.$auth.$state.user.favourites.find(e => e._id === id)
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
