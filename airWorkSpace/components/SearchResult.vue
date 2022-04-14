<template>
  <v-col v-if="!$vuetify.breakpoint.mdAndUp" class="mx-0 px-0" cols="12" sm="6" md="6">
    <v-card
      v-for="(center, idx) in $store.state.centers"
      :key="idx"
      class="mx-auto my-2 rounded-xl"
      max-width="344"
      elevation="1"
    >
      <v-img
        :src="center.photos[0]"
        height="200px"
        @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})"
      />

      <v-card-title @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})">
        {{ center.name }}
      </v-card-title>

      <v-card-subtitle class="py-0">
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
          {{ showDescription[idx] ? 'Less': 'More' }}
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
  <v-col
    v-else
    cols="12"
    sm="12"
    md="12"
    class="mx-0 px-0"
    style="height:100%"
  >
    <v-card height="100%" elevation="0" class="overflow-auto px-0 mx-0">
      <v-card
        v-for="(center, idx) in $store.state.centers"
        :key="idx"
        elevation="0"
        class="mx-auto my-2"
        width="100%"
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
              @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})"
            />
          </v-list-item-avatar>
          <v-list-item-content style="height:300px">
            <v-list-item-title class="headline font-weight-bold" @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})">
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
              >
                <v-icon @click.prevent="addFavourite(center._id)">
                  {{ isFavourite(center._id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider /> -->
      </v-card>
    </v-card>
  </v-col>
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
