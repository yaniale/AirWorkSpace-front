<template>
  <v-row>
    <v-col>
      <v-container>
        <v-card
          class="mx-auto text-center"
          color="primary"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="value"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              >
                <template #label="item">
                  ${{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Sales Last Week
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions class="justify-center">
            <v-btn
              block
              text
            >
              Go to Report
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
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

</style>
