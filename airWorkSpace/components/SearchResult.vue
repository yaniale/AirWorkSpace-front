<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
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
            color="orange lighten-2"
            text
          >
            <v-icon @click.prevent="addFavourite(center._id)">
              mdi-heart-outline
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
  name: 'SearchResult',
  data () {
    return {
      showDescription: []
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
