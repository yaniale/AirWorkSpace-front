<template>
  <div>
    <v-card>
      <v-card-title class="justify-center">
        Completa tu reserva
      </v-card-title>
      <v-card-text>
        <v-input label="Centro seleccionado: ">
          {{ center.name }}
        </v-input>
        <v-input label="Tipo de mesa seleccionado: ">
          {{ ratePlan.appliesTo }}
        </v-input>
        <v-input label="Tarifa seleccionada: ">
          {{ ratePlan.name }}
        </v-input>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'BookingPage',
  data () {
    return {
      ratePlan: {},
      center: {}
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
      this.ratePlan = this.center.ratePlan.find(e => e._id === this.$route.query.rate)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
