<template>
  <v-row>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>
          {{ center.name }}
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">
        {{ center.type }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ center.description }}</div>
        <!-- Ubicación -->
        <v-input
          prepend-icon="mdi-map-marker-outline"
        >
          Dónde estamos
          <v-btn
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-expand-transition>
            <div v-show="show">
              <v-divider />
              <v-card-text>
                <span>{{ center.address1 }} -</span>
                <span>{{ center.address2 }} -</span>
                <span>{{ center.postalCode }} -</span>
                <span>{{ center.city }} -</span>
                <span>{{ center.country }}</span>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-input>
        <v-divider />
        <!-- Tipos de mesa -->
        <v-card-title>
          Elige tu espacio
        </v-card-title>
        <v-card
          v-for="(allotment, idx) in center.allotment"
          :key="idx"
          flat
          @click="$router.push({ path:`/center/rateplan`, query:{type: allotment.type, id: center._id}, component:'RatePlanPage'})"
        >
          <v-card-subtitle>{{ center.allotment[idx].name }}</v-card-subtitle>
          <!-- añadir foto?? -->
          <v-divider />
        </v-card>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'CenterPage',
  data () {
    return {
      center: {},
      show: false
    }
  },
  mounted () {
    this.getCenter()
  },
  methods: {
    getCenter () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
