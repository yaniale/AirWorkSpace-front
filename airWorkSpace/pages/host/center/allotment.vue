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
        <v-card-subtitle class="font-weight-bold">
          Add photos of your center
        </v-card-subtitle>
        <v-card-text class="caption">
          **Max. 5 photos
        </v-card-text>
        <v-card-text>
          <v-text-field label="Photo link 1">
            <!-- {{ center.photos }} -->
          </v-text-field>
          <v-text-field label="Photo link 2">
            <!-- {{ center.photos }} -->
          </v-text-field><v-text-field label="Photo link 3">
            <!-- {{ center.photos }} -->
          </v-text-field><v-text-field label="Photo link 4">
            <!-- {{ center.photos }} -->
          </v-text-field><v-text-field label="Photo link 5">
            <!-- {{ center.photos }} -->
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn>Save & create more</v-btn>
          <v-btn to="/host/center/services">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AllotmentPage',
  data () {
    return {
      allotment: {},
      tableType: ['Fixed Desk', 'Flex Desk', 'Office', 'Conference Room']
    }
  }
  // methods: {
  //   async addDesk() {
  //     await this.$axios.put()
  //   }
  // }
}
</script>

<style lang="scss" scoped>

</style>
