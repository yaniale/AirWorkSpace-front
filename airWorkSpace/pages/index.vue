<template>
  <v-container fluid fill-height>
    <v-row v-if="$store.state.userView" style="max-height: 90vh; overflow: hidden;">
      <v-row v-if="$store.state.centers.length===0" justify="start" align="center" no-gutters>
        <v-col cols="12" sm="8" md="8">
          <v-card v-if="$store.state.centers.length === 0" elevation="0">
            <v-overlay class="indexPage" style="z-index:0">
              <v-card v-if="!$vuetify.breakpoint.mdAndUp" class="transparent" elevation="0">
                <v-card-title>
                  Where do you wana...
                </v-card-title>
                <v-card-title class="justify-end">
                  ...work today?
                </v-card-title>
              </v-card>
              <v-container v-else>
                <v-card class="my-30 rounded-lg" color="red lighten-2" light elevation="2" style="width:100%; height: 20em;display:flex; flex-direction: column;">
                  <v-spacer />
                  <v-card-text class="text-h3 white--text px-10" justify="end" align="center">
                    Tired of working at your own place? Try one of ours!
                  </v-card-text>
                  <v-spacer />
                  <!-- <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary">
                      Search around you
                    </v-btn>
                    <v-spacer />
                  </v-card-actions> -->
                  <div class="mx-auto">
                    <SearchBar />
                  </div>
                  <v-spacer />
                </v-card>
                <v-card style="margin-top: 50px" color="transparent" flat>
                  <v-card-title class="headline font-weight-black mt-0 pt-0">
                    Take a look at our most popular centers!
                  </v-card-title>
                  <v-row cols="12">
                    <v-col v-for="(center, idx) in randomCenters" :key="idx" cols="3">
                      <v-card light class="rounded-lg" height="230px">
                        <!-- <v-list-item-avatar
                            tile
                            size="100"
                            color="grey"
                            class="rounded-xl mx-0"
                          >
                        </v-list-item-avatar> -->
                        <v-img
                          :src="center.photos[0]"
                          cover
                          height="130px"
                          @click="getCenter(center._id)"
                        />
                        <v-input class="font-weight-bold px-2 pt-2" hide-details>
                          {{ center.name }}
                        </v-input>
                        <v-input outlined class="caption px-2" hide-details>
                          {{ center.type }}
                        </v-input>
                        <v-card-actions class="py-1">
                          <v-spacer />
                          <v-btn text class="primary--text" @click="getCenter(center._id)">
                            More Info
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
            </v-overlay>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="mx-0 px-0" style="max-height: 100vh; overflow: hidden; width:100%;">
        <v-col class="mx-0 px-0" cols="12" sm="6" md="7" style="max-height: 100vh; overflow: auto;">
          <SearchResult />
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.xs" cols="12" sm="6" md="5" class="px-0">
          <GoogleMapsCenters :centers="$store.state.centers" />
        </v-col>
      </v-row>
    </v-row>
    <v-row v-else>
      <v-col>
        <HomeHost />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'IndexPage',
  data () {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ],
      pageModel: 'user',
      randomCenters: []
    }
  },
  mounted () {
    this.getRandom()
    this.checkHost()
  },
  methods: {
    checkHost () {
      if (!this.$auth.$state.user || this.$auth.$state.user.role !== 'host') {
        this.pageModel = 'user'
      } else {
        this.pageModel = 'host'
      }
    },
    async getRandom () {
      const allCenters = await this.$axios.get('/center')
      for (let i = 0; i < 4; i++) {
        const element = allCenters.data[Math.floor(Math.random() * allCenters.data.length)]
        this.$set(this.randomCenters, i, element)
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
  .indexPage {
    z-index:0;
    background-image:url('https://334045-1026637-1-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/11/Grand_Opening_TAGVienna293-1024x683.jpg');
    background-size:cover;
  }
</style>
<style >
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
}

</style>
