<template>
  <v-container fluid>
    <v-card
      v-for="(rate, idx) in ratePlan"
      :key="idx"
      width="100%"
      elevation="0"
      class="ma-0"
    >
      <v-card-title class="pb-2">
        {{ rate.name }}
      </v-card-title>
      <v-chip outlined class="mx-2">
        {{ getType(rate.appliesTo) }}
      </v-chip>
      <v-card-text>
        <v-input>{{ rate.description }}</v-input>
        <v-input label="Available from: ">
          <span class="ml-2">
            {{ formatDate(rate.fromDate) }}
          </span>
        </v-input>
        <v-input label="Available to: ">
          <span class="ml-2">
            {{ formatDate(rate.toDate) }}
          </span>
        </v-input>
        <v-input label="Rate/day: ">
          {{ rate.price }}€
        </v-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="rateSelected" color="primary" @click="selectRate(rate._id)">
          Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'RatePlanComponent',
  props: {
    ratePlan: {
      type: Array,
      default () {
        return []
      }
    },
    center: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      rateSelected: false
    }
  },
  methods: {
    getType (type) {
      return utils.getType(type)
    },
    formatDate (date) {
      return utils.formatDate(date)
    },
    selectRate (rateId) {
      this.$store.commit('selectBooking', { centerId: this.center._id, rateId })
      this.rateSelected = true
      this.$emit('rateSelected', this.rateSelected)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
