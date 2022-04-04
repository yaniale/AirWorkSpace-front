<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="my-2">
        <v-card-title class="justify-center">
          Completa tu reserva
        </v-card-title>
        <v-card-text>
          <v-text-field outilned disabled label="Centro: " :value="center.name" />
          <v-text-field outilned disabled label="Tipo: " :value="setType()" />
          <v-text-field outilned disabled label="Tarifa: " :value="ratePlan.name" />
        </v-card-text>
      </v-card>
      <v-card class="my-2">
        <v-card-title>
          Elige tus fechas
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
      <v-card class="my-2">
        <v-card-title>
          ¿Cuántas necesitas?
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="inputQuantity"
            :items="quantity"
            filled
            label="Número de personas..."
            dense
          />
        </v-card-text>
      </v-card>
      <v-card class="my-2">
        <v-card-actions>
          <v-spacer />
          <v-btn @click="setBooking">
            Siguiente
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'

export default {
  name: 'BookingPage',
  middleware: 'auth',
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
  mounted () {
    this.getDetails()
    this.setQuantity()
  },
  methods: {
    getDetails () {
      this.center = this.$store.state.centers.find(e => e._id === this.$route.query.id)
      this.ratePlan = this.center.ratePlan.find(e => e._id === this.$route.query.rate)
      this.allotment = this.center.allotment.find(e => e.type === this.ratePlan.appliesTo)
    },
    setType () {
      return utils.getType(this.ratePlan.appliesTo)
    },
    setQuantity () {
      for (let i = 1; i <= this.allotment.quantity; i++) {
        const element = i
        this.quantity.push(element)
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
