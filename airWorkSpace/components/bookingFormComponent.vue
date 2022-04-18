<template>
  <v-container fluid>
    <v-card class="my-2" elevation="0">
      <v-card-title v-if="$vuetify.breakpoint.smAndDown" class="justify-center">
        Complete your booking
      </v-card-title>
      <v-card-text>
        <v-text-field outilned disabled label="Center: " :value="center.name" />
        <v-text-field outilned disabled label="Type: " :value="setType()" />
        <v-text-field outilned disabled label="Rate: " :value="ratePlan.name" />
      </v-card-text>
    </v-card>
    <v-card class="my-2" elevation="0">
      <v-card-title>
        Select the dates
      </v-card-title>
      <v-card-text>
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
              label="From..."
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
              label="To..."
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
    </v-card>
    <v-card class="my-2" elevation="0">
      <v-card-title>
        How many do you need?
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="inputQuantity"
          :items="quantity"
          filled
          label="Quantity"
          dense
        />
      </v-card-text>
    </v-card>
    <v-card class="my-2" elevation="0">
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="setBooking">
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'BookingFormComponent',
  middleware: 'auth',
  props: {
    centerId: {
      type: String,
      default () {
        return ''
      }
    },
    rateId: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      ratePlan: {},
      center: {},
      allotment: {},
      dates: [],
      from: false,
      to: false,
      dateFrom: '',
      dateTo: '',
      quantity: [],
      inputQuantity: '0'
    }
  },
  watch: {
    '$store.state.bookingSelect.rateId': {
      handler () {
        this.getDetails()
      },
      deep: true
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      if (this.centerId && this.rateId) {
        this.center = this.$store.state.centers.find(e => e._id === this.centerId)
        this.ratePlan = this.center.ratePlan.find(e => e._id === this.rateId)
        this.allotment = this.center.allotment.find(e => e.type === this.ratePlan.appliesTo)
        this.setQuantity()
      }
    },
    setType () {
      if (this.ratePlan) {
        return utils.getType(this.ratePlan.appliesTo)
      }
    },
    setQuantity () {
      if (this.allotment) {
        for (let i = 1; i <= this.allotment.quantity; i++) {
          const element = i
          this.$set(this.quantity, i - 1, element)
          this.quantity.push(element)
        }
      }
    },
    setBooking () {
      const booking = {
        fromTime: new Date(this.dateFrom),
        toTime: new Date(this.dateTo),
        type: this.ratePlan.appliesTo,
        ratePlan: this.ratePlan._id,
        bookedQuantity: this.inputQuantity,
        totalRate: this.ratePlan.price * this.inputQuantity,
        totalDiscount: this.ratePlan.price * this.ratePlan.discount / 100 * this.inputQuantity,
        totalTax: this.ratePlan.price * this.ratePlan.discount / 100 * this.ratePlan.tax / 100 * this.inputQuantity
      }

      if (this.dateFrom && this.dateTo && this.inputQuantity) {
        this.$store.commit('createBooking', booking)
        this.$router.push({ path: '/center/booking/checkout', query: { id: this.center._id, rate: this.ratePlan._id }, component: 'BookingCheckOut' })
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
