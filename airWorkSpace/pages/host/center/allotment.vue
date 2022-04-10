<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/ratePlans', component:'RatePlans'})">
            mdi-chevron-left
          </v-icon> Set your allotments
        </v-card-title>
      </v-card>
      <v-card>
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
}
</script>

<style lang="scss" scoped>

</style>
