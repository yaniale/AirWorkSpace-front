<template>
  <v-row>
    <v-card flat class="ma-auto">
      <v-card-title>
        <v-icon @click="$router.push({ path:`/center/`, query:{id: center._id}, component:'CenterPage'})">
          mdi-chevron-left
        </v-icon>

        Tarifas
      </v-card-title>
    </v-card>
    <v-card
      v-for="(rate, idx) in ratePlan"
      :key="idx"
      width="90%"
      class="ma-auto"
    >
      <v-card-title>{{ ratePlan[idx].name }}</v-card-title>
      <v-card-subtitle>{{ ratePlan[idx].appliesTo }}</v-card-subtitle>
      <v-card-text>
        <v-input>{{ ratePlan[idx].description }}</v-input>
        <v-input label="Disponible desde: ">
          {{ ratePlan[idx].fromDate }}
        </v-input>
        <v-input label="Disponible hasta: ">
          {{ ratePlan[idx].toDate }}
        </v-input>
        <v-input label="Precio/día: ">
          {{ ratePlan[idx].price }}€
        </v-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="$router.push({ path:`/booking`, query:{id: center._id, rate: ratePlan[idx]._id}, component:'BookingPage'})">
          Reservar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'RatePlanPage',
  data () {
    return {
      ratePlan: [],
      center: {}
    }
  },
  mounted () {
    this.getRatePlan()
  },
  methods: {
    getRatePlan () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
      this.ratePlan = this.center.ratePlan.filter(e => e.appliesTo === this.$route.query.type)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
