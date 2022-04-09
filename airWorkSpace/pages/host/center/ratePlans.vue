<template>
  <v-row>
    <v-col>
      <v-card flat class="ma-auto">
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/newcenter', component:'NewCenterPage'})">
            mdi-chevron-left
          </v-icon>

          Add your rate plans
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-text>
          <v-form>
            <v-text-field v-model="ratePlan.name" label="Plan Name" />
            <v-select v-model="ratePlan.appliesTo" dense :items="tableType" label="Select table type" />
            <v-textarea v-model="ratePlan.description" rows="2" label="Description" />
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-text-field v-model="ratePlan.price" label="Price" />
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="ratePlan.discount" label="% Disc." />
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="ratePlan.tax" cols="6" label="Tax" />
                </v-col>
              </v-row>
              <v-text-field v-model="ratePlan.minBookingTime" label="Min. Booking Time" />
              <v-text-field v-model="ratePlan.minBookingDays" label="Min. Booking Days" />
              <!-- Calendario From -->
              <v-dialog
                ref="from"
                v-model="from"
                :return-value.sync="dateFrom"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFrom"

                    label="Valid from..."
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dateFrom"
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="from = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.from.save(dateFrom)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
              <!-- Calendario TO -->
              <v-dialog
                ref="to"
                v-model="to"
                :return-value.sync="dateTo"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateTo"
                    label="Valid to..."
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dateTo"
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="to = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.to.save(dateTo)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-card-text>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn>Save & create more</v-btn>
          <v-btn @click="createRatePlans()">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'RatePlans',
  data () {
    return {
      ratePlan: {},
      center: this.$route.query.id,
      tableType: ['Fixed Desk', 'Flex Desk', 'Office', 'Conference Room'],
      from: false,
      to: false,
      dateFrom: '',
      dateTo: ''

    }
  },
  methods: {
    createRatePlans () {
      try {
        // await this.$axios.put(`/center/${this.center._id}/rateplan`, this.ratePlan)
        // this.$router.push({ path: '/host/center/allotment', query: { id: this.center._id }, component: 'AllotmentPage' })
        console.log('añadido')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
