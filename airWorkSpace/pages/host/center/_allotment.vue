<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/ratePlans', component:'RatePlans'})">
            mdi-chevron-left
          </v-icon> Desk types & Photos
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-subtitle class="font-weight-bold">
          Desk types
        </v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field v-model="allotment.name" label="Name" />
            <v-select v-model="allotment.type" label="Select table type" dense :items="tableType" />
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="allotment.quantity" label="Quantity" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-text v-if="errorHandling.compulsoryFields[0]" class="red--text py-0 my-0 caption">
          {{ errorHandling.compulsoryFields[1] }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click.prevent="addDesk()">
            Save & add more
          </v-btn>
        </v-card-actions>
        <v-card-subtitle class="font-weight-bold">
          Add photos of your center
        </v-card-subtitle>
        <v-card-text class="caption">
          **Max. 5 photos
        </v-card-text>
        <v-card-text>
          <v-text-field label="Photo link 1">
            {{ center.photos }}
          </v-text-field>
          <v-text-field label="Photo link 2">
            {{ center.photos }}
          </v-text-field><v-text-field label="Photo link 3">
            {{ center.photos }}
          </v-text-field><v-text-field label="Photo link 4">
            {{ center.photos }}
          </v-text-field><v-text-field label="Photo link 5">
            {{ center.photos }}
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="saveAll()">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import utils from '@/services/utils.services'
export default {
  name: 'AllotmentPage',

  data () {
    return {
      center: {},
      allotment: [],
      tableType: ['Fixed Desk', 'Flex Desk', 'Office', 'Conference Room'],
      errorHandling: {
        compulsoryFields: [false, 'You haven\'t added anything.']
      }
    }
  },
  mounted () {
    this.getCenter()
  },
  methods: {
    async getCenter () {
      const centerId = this.$route.params.allotment
      const centerObj = await this.$axios.get(`/center/${centerId}`)
      this.center = centerObj.data
    },

    async addDesk () {
      const data = {
        name: this.allotment.name,
        type: utils.getType(this.allotment.type),
        quantity: this.allotment.quantity
      }

      if (data.name && data.type) {
        this.center.allotment.push(data)
        await this.$axios.put(`/center/${this.center._id}/allotment`, data)
        this.allotment.name = ''
        this.allotment.type = ''
        this.allotment.quantity = ''
      } else {
        this.$set(this.errorHandling.compulsoryFields, 0, true)
      }
    },
    saveAll () {
      console.log(this.center._id)
      // const data = {
      //   photos: this.center.photos
      // }

      // const updated = await this.$axios.put(`/center/${this.center._id}`, data)
      // this.$router.push({ path: `/host/center/${updated._id}/`, component: 'RatePlans' })
      // await this.$auth.fetchUser()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
