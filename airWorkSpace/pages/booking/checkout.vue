<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="my-2">
        <v-card-title class="justify-left">
          Revisa antes de confirmar
        </v-card-title>
        <v-card-text>
          <v-text-field outilned disabled label="Centro: " :value="center.name" />
          <v-text-field outilned disabled label="Tipo: " :value="setType()" />
          <v-text-field outilned disabled label="Tarifa: " :value="ratePlan.name" />
          <v-text-field outilned disabled label="Desde: " :value="booking.fromDate" />
          <v-text-field outilned disabled label="Hasta: " :value="booking.fromDate" />
          <v-text-field outilned disabled label="Tarifa: " :value="booking.totalRate" />
          <v-text-field outilned disabled label="Descuento: " :value="booking.totalDiscount" />
          <v-text-field outilned disabled label="Impuestos: " :value="booking.totalTax * -1" />
          <v-text-field outilned disabled label="Total: " :value="booking.totalRate - booking.totalDiscount + booking.totalTax" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '../../services/utils.services'
export default {
  name: 'BookingCheckOut',
  data () {
    return {
      center: {},
      ratePlan: {},
      booking: this.$store.state.createBooking
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
      this.ratePlan = this.center.ratePlan.find(e => e._id === this.$route.query.rate)
    },
    setType () {
      return utils.getType(this.booking.type)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
