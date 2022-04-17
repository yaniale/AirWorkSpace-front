<template>
  <div>
    <v-card flat>
      <v-card-title class="mb-5">
        Statistics
      </v-card-title>
      <v-row>
        <!-- <v-col>Centers</v-col> -->
        <v-col cols="4">
          <v-icon>
            mdi-office-building-outline
          </v-icon>
        </v-col>
        <!-- <v-col>Total Bookings</v-col> -->

        <v-col>
          <!-- <v-col>Pending</v-col> -->
          <v-icon class="warning--text">
            mdi-clock
          </v-icon>
        </v-col>
        <!-- <v-col>Cancelled</v-col> -->
        <v-col>
          <v-icon class="error--text">
            mdi-cancel
          </v-icon>
        </v-col>
        <!-- <v-col>Confirmed</v-col> -->
        <v-col>
          <v-icon class="success--text">
            mdi-check
          </v-icon>
        </v-col>
        <v-col>
          <v-icon>
            mdi-sigma
          </v-icon>
        </v-col>
      </v-row>
      <v-row v-for="(center, idx) in centers" :key="idx">
        <v-col cols="4">
          {{ center.name }}
        </v-col>
        <v-col>{{ center.bookings.filter(e => e.status === 'open').length }}</v-col>
        <v-col>{{ center.bookings.filter(e => e.status === 'cancelled').length }}</v-col>
        <v-col>{{ center.bookings.filter(e => e.status === 'confirmed').length }}</v-col>
        <v-col>{{ center.bookings.length }}</v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: [
      423,
      446,
      675,
      510,
      590,
      610,
      760
    ],
    centers: []
  }),
  mounted () {
    this.getMyCenters()
  },
  methods: {
    async getMyCenters () {
      const myCenters = await this.$axios.get(`/center?owner=${this.$auth.$state.user._id}`)
      this.centers = myCenters.data
      this.$store.commit('addCenters', this.centers)
    }

  }
}

</script>

<style lang="scss" scoped>
.border {
  border: 1px dotted grey
}

.header {
  border-top-left-radius: 25px;
  border: 1px solid red
}
</style>
