<template>
  <v-row>
    <v-col v-if="!$vuetify.breakpoint.mdAndUp" cols="12" sm="6" md="6">
      <v-card
        v-for="(center, idx) in $store.state.centers"
        :key="idx"
        class="mx-auto my-2"
        max-width="344"
      >
        <v-img
          :src="center.photos[0]"
          height="200px"
          @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})"
        />

        <v-card-title @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})">
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
    <v-col v-else cols="12" sm="12" md="12">
      <v-card
        v-for="(center, idx) in $store.state.centers"
        :key="idx"
        elevation="0"
        class="mx-auto my-2"
        width="100%"
      >
        <v-list-item>
          <v-list-item-avatar tile size="300" color="grey">
            <v-img
              :src="center.photos[0]"
              cover
              @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})"
            />
          </v-list-item-avatar>
          <v-list-item-content style="height:300px">
            <v-list-item-title class="headline" @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})">
              {{ center.name }}
            </v-list-item-title>
            <v-list-item-title class="title">
              {{ center.type }}
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle text-wrap">
              {{ center.address1 }} {{ center.address2 ? ` - ${center.address2} - ` : '' }} , {{ center.postalCode }} {{ center.city }} , {{ center.country }}
            </v-list-item-subtitle>
            <div>
              {{ center.description }}
            </div>
            <v-list-item-action>
              <v-spacer />
              <v-btn
                color="red lighten-2"
                text
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
  name: 'SearchResult',
  data () {
    return {
      showDescription: []
    }
  },
  computed: {
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
        this.$router.push('/auth')
      } else {
        await this.$axios.put(`/user/profile/favourites/${id}`)
        await this.$auth.fetchUser()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
