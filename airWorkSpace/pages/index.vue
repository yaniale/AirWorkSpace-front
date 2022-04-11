<template>
  <v-row v-if="$store.state.userView">
    <v-row v-if="$store.state.centers.length===0" justify="start" align="center" no-gutters>
      <v-col cols="12" sm="8" md="6">
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
          </v-overlay>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="6" md="6">
        <SearchResult />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <GoogleMapsCenters />
      </v-col>
    </v-row>
  </v-row>
  <v-row v-else>
    <v-col>
      <HomeHost />
    </v-col>
  </v-row>
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
      pageModel: 'user'
    }
  },
  mounted () {
    this.checkHost()
  },
  methods: {
    checkHost () {
      if (!this.$auth.$state.user || this.$auth.$state.user.role !== 'host') {
        this.pageModel = 'user'
      } else {
        this.pageModel = 'host'
      }
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
