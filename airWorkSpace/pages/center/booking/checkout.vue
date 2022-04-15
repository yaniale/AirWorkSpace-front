<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="my-2">
        <v-card-title class="justify-left">
          Check before confirm
        </v-card-title>
        <v-card-text>
          <v-text-field outilned disabled label="Center: " :value="center.name" />
          <v-input>
            <v-text-field outilned disabled label="Type: " :value="setType()" />
            <v-text-field outilned disabled label="Rate Plan: " :value="ratePlan.name" />
          </v-input>
          <v-input hide-details>
            <v-text-field outilned disabled label="From: " :value="formatDate(booking.fromTime)" />
            <v-text-field outilned disabled label="To: " :value="formatDate(booking.toTime)" />
          </v-input>
          <v-card-text>
            <v-text-field right outilned disabled label="Rate: " :value="booking.totalRate" />
            <v-text-field outilned disabled label="Discount: " :value="booking.totalDiscount" />
            <v-text-field outilned disabled label="Tax: " :value="booking.totalTax * -1" />
            <v-text-field outilned disabled label="Total: " :value="booking.totalRate - booking.totalDiscount + booking.totalTax" />
          </v-card-text>
        </v-card-text>
        <v-card-text>
          <v-input>
            <v-checkbox v-model="modal" :label="disclaimer" />
          </v-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="submitBooking">
            confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'
export default {
  name: 'BookingCheckOut',
  data () {
    return {
      modal: false,
      disclaimer: 'I confirm that the reservation information is correct and I have read and accept terms and conditions.',
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
    },
    formatDate (date) {
      return utils.formatDate(date)
    },
    async submitBooking () {
      try {
        if (this.modal) {
          await this.$axios.post(`/center/${this.center._id}/bookings`, this.booking)
          await this.$auth.fetchUser()
          this.$router.push('/profile/bookings')
        }
      } catch (error) {
        return error
      }
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
