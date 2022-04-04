<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
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
        class="mx-auto my-2"
      >
        <v-card-title>{{ ratePlan[idx].name }}</v-card-title>
        <v-card-subtitle>{{ getType(ratePlan[idx].appliesTo) }}</v-card-subtitle>
        <v-card-text>
          <v-input>{{ ratePlan[idx].description }}</v-input>
          <v-input label="Disponible desde: ">
            <span class="ml-2">
              {{ formatDate(ratePlan[idx].fromDate) }}
            </span>
          </v-input>
          <v-input label="Disponible hasta: ">
            <span class="ml-2">
              {{ formatDate(ratePlan[idx].toDate) }}
            </span>
          </v-input>
          <v-input label="Precio/día: ">
            {{ ratePlan[idx].price }}€
          </v-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="$router.push({ path:`/center/booking`, query:{id: center._id, rate: ratePlan[idx]._id}, component:'BookingPage'})">
            Reservar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'

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
    },
    getType (type) {
      return utils.getType(type)
    },
    formatDate (date) {
      return utils.formatDate(date)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
